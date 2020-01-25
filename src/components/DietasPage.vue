<template>
  <div class="miclase">
    <div v-if="pantalla === 'Kms'">
      <div class="columns is-mobile">
        <div v-for="(tramo, index) in ['6 - 8', '14 - 16', '21 - 23']" :key="index" class="column">
          <h4>{{tramo}}</h4>
        </div>
        <div class="column">
          <a @click="agregarJornada" class="button is-success is-outlined is-focused is-size-5">+</a>
        </div>
      </div>
      <div v-for="(jornada, index) in jornadas" :key="`jor-${index}`" class="columns is-mobile">
        <div class="column bandera" :style="desayuno(jornada)">
          <input v-model="jornada.desa_nac" type="checkbox" @click="remueve_ext(jornada, 'desa_')" />
          <input v-model="jornada.desa_ext" type="checkbox" @click="remueve_nac(jornada, 'desa_')" />
        </div>
        <div class="column bandera" :style="comida(jornada)">
          <input v-model="jornada.comi_nac" type="checkbox" @click="remueve_ext(jornada, 'comi_')" />
          <input v-model="jornada.comi_ext" type="checkbox" @click="remueve_nac(jornada, 'comi_')" />
        </div>
        <div class="column bandera" :style="cena(jornada)">
          <input v-model="jornada.cena_nac" type="checkbox" @click="remueve_ext(jornada, 'cena_')" />
          <input v-model="jornada.cena_ext" type="checkbox" @click="remueve_nac(jornada, 'cena_')" />
        </div>
        <div class="column bandera">
          <a class="is-size-6">{{index+1}}</a>
          <a
            @click="removeJornada(index)"
            class="button is-danger is-outlined is-focused is-size-5"
          >-</a>
        </div>
      </div>
      <div class="footer">
        <div class="columns is-mobile">
          <div class="column" v-for="(d,index) in ['Des.', 'Com.', 'Cen.']" :key="index">
            <h4>{{d}}</h4>
          </div>
          <div class="column"></div>
        </div>
        <div class="columns is-mobile">
          <div class="column" v-for="(d,index) in ['desa_', 'comi_', 'cena_']" :key="index">
            <h4>
              <img src="../assets/spain.svg" alt />
              {{items[d+"nac"]}}
            </h4>
          </div>
          <div class="column"></div>
        </div>
        <div class="columns is-mobile">
          <div class="column" v-for="(d,index) in ['desa_', 'comi_', 'cena_']" :key="index">
            <h4>
              <img src="../assets/redondo_europa.svg" alt />
              {{items[d+"ext"]}}
            </h4>
          </div>
          <div class="column"></div>
        </div>
        <div class="is-inline-block">
          <p class="is-size-5">Total {{calculatotal}} €</p>
          <a
            @click="borratodo()"
            class="button is-danger is-outlined is-hovered is-size-5"
          >Borrar todo</a>
        </div>
      </div>
    </div>
    <div v-else class="field">
      <div>
        <Kms :dietas="calculatotal" />
      </div>
    </div>
    <div>
      <a
        id="mybutton"
        @click="pantalla = pantalla === 'Kms' ? 'Dietas': 'Kms'"
        class="button is-info is-outlined is-hovered is-size-5"
      >{{pantalla}}</a>
    </div>
  </div>
</template>

<script>
//require("@/assets/styles/estilos-dietaspage.css");
const STORAGE_NAME = "clave_storage";
import Kms from "./Kms.vue";
export default {
  name: "DietasPage",
  components: { Kms },
  created() {
    this.jornadas = JSON.parse(
      localStorage.getItem(STORAGE_NAME) || [
        {
          desa_nac: null,
          comi_nac: null,
          cena_nac: null,
          desa_ext: null,
          comi_ext: null,
          cena_ext: null
        }
      ]
    );
  },
  data() {
    return {
      kms: {
        type: Number
      },
      pantalla: "Kms",
      precio: {
        conceptos: [
          "desa_nac",
          "desa_ext",
          "comi_nac",
          "comi_ext",
          "cena_nac",
          "cena_ext"
        ],
        dieta2018: [7.9458, 12.8263, 19.8571, 24.9445, 17.3872, 21.2292]
      },
      jornadas: [
        {
          desa_nac: null,
          comi_nac: null,
          cena_nac: null,
          desa_ext: null,
          comi_ext: null,
          cena_ext: null
        }
      ],
      //color_nac: "#dadd2394",
      color_nac: "repeating-linear-gradient(red, yellow 50%, red);",
      //color_ext: "#4c5eaf83"
      color_ext: "#1287df"
    };
  },
  methods: {
    remueve_ext(jornada, momento) {
      //console.log(momento+"nac");
      jornada[momento + "ext"] = false;
    },
    remueve_nac(jornada, momento) {
      jornada[momento + "nac"] = false;
    },
    agregarJornada() {
      this.jornadas.push({
        desa_nac: null,
        comi_nac: null,
        cena_nac: null,
        desa_ext: null,
        comi_ext: null,
        cena_ext: null
      });
      localStorage.setItem(STORAGE_NAME, JSON.stringify(this.jornadas));
    },
    removeJornada(indice) {
      this.jornadas.splice(indice, 1);
      localStorage.setItem(STORAGE_NAME, JSON.stringify(this.jornadas));
    },
    desayuno(jornada) {
      const n = jornada.desa_nac;
      const e = jornada.desa_ext;
      localStorage.setItem(STORAGE_NAME, JSON.stringify(this.jornadas));
      return n
        ? `background-image: ${this.color_nac};`
        : e
        ? `background: ${this.color_ext};`
        : "background: white;";
    },
    comida(jornada) {
      const n = jornada.comi_nac;
      const e = jornada.comi_ext;
      localStorage.setItem(STORAGE_NAME, JSON.stringify(this.jornadas));
      return n
        ? `background-image: ${this.color_nac};`
        : e
        ? `background: ${this.color_ext};`
        : "background: white;";
    },
    cena(jornada) {
      const n = jornada.cena_nac;
      const e = jornada.cena_ext;
      localStorage.setItem(STORAGE_NAME, JSON.stringify(this.jornadas));
      return n
        ? `background-image: ${this.color_nac};`
        : e
        ? `background: ${this.color_ext};`
        : "background: white;";
    },
    borratodo() {
      this.jornadas = [
        {
          desa_nac: null,
          comi_nac: null,
          cena_nac: null,
          desa_ext: null,
          comi_ext: null,
          cena_ext: null
        }
      ];
      localStorage.setItem(STORAGE_NAME, JSON.stringify(this.jornadas));
    } /* ,
    cambiapantalla(){
      this.pantalla === 'Kms '? 'Kms': 'Dietas'
    } */
  },
  computed: {
    sumados() {
      const control = {};
      this.precio.conceptos.forEach((momento, indice) => {
        control[momento] =
          this.jornadas.filter(j => j[momento]).length *
          this.precio.dieta2018[indice];
      });
      return control;
    },
    items() {
      const control = {};
      this.precio.conceptos.forEach(momento => {
        control[momento] = this.jornadas.filter(j => j[momento]).length;
      });
      return control;
    },
    calculatotal() {
      const control = {};
      let sumatoria = 0;
      this.precio.conceptos.forEach((momento, indice) => {
        sumatoria += control[momento] =
          this.jornadas.filter(j => j[momento]).length *
          this.precio.dieta2018[indice];
      });
      return sumatoria.toFixed(2);
    }
  }
};
</script>
<style scoped src="@/assets/styles/estilos-dietaspage.css">
</style>