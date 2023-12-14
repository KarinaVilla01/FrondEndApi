<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Characters Rick and Morty"></v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Navigation drawer"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center">
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="searchQuery" type="text" label="Search your character"></v-text-field>
        </v-col>
        <v-container v-if="filteredCharacters.length > 0" fluid>
          <v-row dense>
            <v-col v-for="character in filteredCharacters" :key="character.id" cols="3">
              <v-card class="mx-auto" max-width="344">
                <v-img :src="character.image" height="200px" cover></v-img>
                <v-card-title>{{ character.name }}</v-card-title>
                <v-card-actions>
                  <v-btn color="orange-lighten-2" variant="text" @click="toggleDetails(character)">
                    Show me more
                  </v-btn>
                  <v-btn :icon="character.showDetails ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                    @click="toggleDetails(character)"></v-btn>
                </v-card-actions>
                <v-expand-transition>
                  <div v-show="character.showDetails">
                    <v-divider></v-divider>
                    <v-card-text>
                      <ul class="ml-5">
                        <v-row>
                          <v-col cols="4">
                            <li>
                              <h6>Status:</h6>
                              {{ character.status }}
                            </li>
                          </v-col>
                          <v-col cols="4">
                            <li>
                              <h6>Gender: </h6>
                              {{ character.gender }}
                            </li>
                          </v-col>
                          <v-col cols="4">
                            <li>
                              <h6>Specie:</h6>
                              {{ character.species }}
                            </li>
                          </v-col>
                        </v-row>
                      </ul>
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <v-col v-else>
          <h3 class="text-center">No characters found.</h3>
        </v-col>
      </v-row>
      <br />
    </v-main>
  </v-layout>
</template>

<script lang="ts">
import axios from 'axios';

interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
  gender: string;
  species: string;
  showDetails: boolean;
}

export default {
  data() {
    return {
      characters: [] as Character[],
      searchQuery: ''
    };
  },
  created() {
    this.callServer();
  },
  computed: {
    filteredCharacters(): Character[] {
      return this.characters.filter((character: Character) => {
        return character.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  },
  methods: {
    async callServer() {
      try {
        const response = await axios.get('http://localhost:3001/');
        this.characters = response.data
        console.log(this.characters.length)
      } catch (error) {
        console.error(error);
      }
    },
    toggleDetails(character: any) {
      character.showDetails = !character.showDetails;
    }
  }
};
</script>
