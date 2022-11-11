<template>
	<tr>
		<td class="table__menu" v-for="el, in tableList">
			<div>
				<div>{{ el }}</div>
				<div @click="$emit('setSort', `${el}`, true)"
					:class="[sort.name == `${el}` && sort.ascending && 'active', 'ascending']"></div>
				<div @click="$emit('setSort', `${el}`, false)"
					:class="[sort.name == `${el}` && !sort.ascending && 'active', 'descending']"></div>
			</div>
		</td>
		<td @click="$emit('dialogVisible', true)" class="item__options">Фильтрация</td>
	</tr>
</template>

<script>
export default {
	props: ["sort"],
	inject: ['tableList']
}
</script>

<style scoped>
.table__menu {
	position: relative;
}

.ascending,
.descending {
	position: absolute;
	right: 20px;
	top: calc(50% + 4px);
	border: 2px solid black;
	padding: 3px;
	border-width: 2px 2px 0px 0px;
	margin-bottom: 4px;
	transform: translateY(-50%) rotate(135deg);
	cursor: pointer;
	transition: all ease 0.3s;
}

.descending {
	top: calc(50% - 4px);
	transform: translateY(-50%) rotate(-45deg);
}

.ascending:hover,
.descending:hover {
	border: 4px solid rgb(175, 41, 41);
	border-width: 2px 2px 0px 0px;
}

.ascending.active,
.descending.active {
	border: 4px solid red;
	border-width: 2px 2px 0px 0px;

}
</style>