<template>
	<tr class="app__item">
		<td >
			<div>{{ item.uid }}</div>
		</td>
		<td >
			<input v-if="isEdit" v-model="inputs.name">
			<div v-else>{{ item.name }}</div>
		</td>
		<td >
			<input v-if="isEdit" v-model="inputs.ipaddres">
			<div v-else>{{ item.ipaddres }}</div>
		</td>
		<td >
			<input v-if="isEdit" v-model="inputs.serialnumber">
			<div v-else>{{ item.serialnumber }}</div>
		</td>
		<td >
			<input v-if="isEdit" v-model="inputs.macaddres">
			<div v-else>{{ item.macaddres }}</div>
		</td>
		<td v-if="isEdit" @click="saveChanges" class="item__options">
			Сохранить
		</td>
		<td v-else @click="changeEdit" class="item__options">
			Изменить
		</td>
	</tr>

</template>

<script>

export default {
	props: ['item'],
	inject: ['tableList'],
	data() {
		return {
			isEdit: false,
			inputs: {
				uid: "",
				name: "",
				ipaddres: "",
				serialnumber: "",
				macaddres: "",
			},
		}
	},
	methods: {
		changeEdit() {
			this.isEdit = !this.isEdit
		},
		async saveChanges() {
			try {
				//await axios.patch('/path', { uid: this.inputs.uid, data: this.inputs })
				this.$emit('saveChanges', this.inputs)
				this.changeEdit()

			} catch (error) {

			}

		}
	},
	mounted() {
		this.inputs = this.item
	}
}
</script>

<style scoped>
input {
	padding: 0px 0px;
	width: 100%;
}

td div {
	width: 100%;
	height: 100%;
}
</style>