import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  private readonly defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = configService.get<number>('defaultLimit');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const newPokemon = await this.pokemonModel.create(createPokemonDto);
      return newPokemon;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    return this.pokemonModel
      .find()
      .skip(offset)
      .limit(limit)
      .sort({
        no: 1,
      })
      .select('-__v');
  }

  async findOne(value: string) {
    let pokemon: Pokemon;

    if (!isNaN(+value)) {
      pokemon = await this.pokemonModel.findOne({
        no: value,
      });
    }

    if (!pokemon && isValidObjectId(value)) {
      pokemon = await this.pokemonModel.findById(value);
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: value.toLowerCase(),
      });
    }

    if (!pokemon) throw new NotFoundException(`Pokemon doesn't exists`);

    return pokemon;
  }

  async update(value: string, updatePokemonDto: UpdatePokemonDto) {
    const dbPokemon = await this.findOne(value);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      await dbPokemon.updateOne(updatePokemonDto);

      return { ...dbPokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    // return { id };
    // const result = await this.pokemonModel.findByIdAndDelete(id);
    const { deletedCount } = await this.pokemonModel.deleteOne({
      _id: id,
    });

    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id: ${id} not found`);
    }

    return;
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon exist in db ${JSON.stringify(error.keyValue)}`,
      );
    }

    throw new InternalServerErrorException(
      `Can't create pokemon check server logs`,
    );
  }
}
