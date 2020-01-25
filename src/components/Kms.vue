<template>
  <div class>
    <table v-if='modo === "ind"' class="table">
      <tr>
        <td>Kms Mensualidad</td>
        <td>
          <input
            autofocus
            v-model="kms_mes"
            type="number"
            class="input has-text-right is-pulled-right"
            style="max-width: 60%;"
            placeholder="Kms"
            @change="setKm_mes()"
          />
        </td>
      </tr>
      <tr>
        <td>Horas Extra</td>
        <td class="has-text-right">{{horas_extra.toFixed(2)}} €</td>
      </tr>
      <tr>
        <td>Horas de Presencia</td>
        <td class="has-text-right">{{horas_presencia.toFixed(2)}} €</td>
      </tr>
      <tr>
        <td>Horas de Nocturnidad</td>
        <td class="has-text-right">{{horas_nocturnidad.toFixed(2)}} €</td>
      </tr>
    </table>
    <table class="table">
      <tr>
        <td>Kms Viaje</td>
        <td class="has-text-right">
          <input
            autofocus
            v-model="kms_viaje"
            type="number"
            class="input has-text-right is-pulled-right"
            style="max-width: 60%;"
            placeholder="Kms"
            @change="setKm_via()"
          />
        </td>
      </tr>
      <tr>
        <td>
          <label class="radio">
            <input type="radio" v-model="modo" value="ind" name="algo" checked />
            Individual
          </label>
        </td>
        <td  class="has-text-right">
          <label class="radio">
            <input type="radio" v-model="modo" value="dob" name="algo" />
            Doble tripulación
          </label>
        </td>
      </tr>      
      <tr>
        <td>Por {{this.modo === 'ind' ? this.kms_viaje : this.kms_viaje /2}} kms</td>
        <td class="has-text-right">{{(this.viaje_kms_euros).toFixed(2)}} €</td>
      </tr>
      <tr>
        <td class="has-background-warning">Dietas</td>
        <td class="has-text-right has-background-warning">{{this.dietas}} €</td>
      </tr>
      <tr>
        <td class="has-background-primary">Resumen de viaje</td>
        <td class="has-text-right has-background-primary is-size-5">{{(this.viaje_kms_euros + Number(this.dietas)).toFixed(2)}} €</td>
      </tr>
    </table>
    <table v-if='modo === "dob"' class="table">
      <tr>
        <td>Para Horas Extra</td>
        <td class="has-text-right">{{(this.viaje_kms_euros*0.5).toFixed(2)}} €</td>
      </tr>
      <tr>
        <td>Para Horas de Presencia</td>
        <td class="has-text-right">{{(this.viaje_kms_euros*0.4).toFixed(2)}} €</td>
      </tr>
      <tr>
        <td>Para Horas de Nocturnidad</td>
        <td class="has-text-right">{{(this.viaje_kms_euros*0.1).toFixed(2)}} €</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: "Kms",
  props: ["dietas"],
  created() {
    (this.kms_mes = JSON.parse(localStorage.getItem("KM_MES"))),
      (this.kms_viaje = JSON.parse(localStorage.getItem("KM_VIAJE"))),
      (this.modo = 'ind');
  },
  data() {
    return {
      kms_mes: null,
      kms_viaje: null,
      valores: { hasta10: 0.0185, masde10: 0.0329, dobles: 0.035 / 2 },
      modo: ''
    };
  },
  methods: {
    setKm_mes() {
      localStorage.setItem("KM_MES", JSON.stringify(this.kms_mes));
    },
    setKm_via() {
      localStorage.setItem("KM_VIAJE", JSON.stringify(this.kms_viaje));
    }
  },
  computed: {
    precio_especifico: function() {
      if (this.kms_mes <= 10000) return this.valores.hasta10;
      else
        return (
          ((this.kms_mes - 10000) * this.valores.masde10 +
            10000 * this.valores.hasta10) /
          this.kms_mes
        );
    },
    horas_extra() {
      return this.kms_mes * this.precio_especifico * 0.5;
    },
    horas_presencia() {
      return this.kms_mes * this.precio_especifico * 0.4;
    },
    horas_nocturnidad() {
      return this.kms_mes * this.precio_especifico * 0.1;
    },
    viaje() {
      return {
        rendimiento_kms: this.kms_viaje
      };
    },
    viaje_kms_euros(){
      if (this.modo === 'ind') return this.kms_viaje * this.precio_especifico;
      else return this.kms_viaje * this.valores.dobles;
    },
    nomina: function() {
      //TODO: MIRAR POR QUE FALLA ESTO :
      return [
        ["Horas Extra", this.horas_extra],
        ["Horas Presencia", this.horas_presencia],
        ["Horas Nocturnidad", this.horas_nocturnidad],
        ["Salario base", "930,34"]
      ];
    }
  }
};
</script>
<style scoped src="@/assets/styles/estilos-kms.css">
</style>