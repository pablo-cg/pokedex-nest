import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async run() {
    await this.pokemonModel.deleteMany();

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const parsedPokemons = data.results.map(({ name, url }) => {
      const urlSegments = url.split('/');
      return {
        no: Number(urlSegments[urlSegments.length - 2]),
        name,
      };
    });

    await this.pokemonModel.insertMany(parsedPokemons);

    return 'Seed Executed';
  }
}
