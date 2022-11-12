<template>
  <div class="app">
    <h2 class="app__title">Список нужных вещей</h2>
    <div class="app__content">

      <table width="100%" class="app__list">
        <TableMenu @dialogVisible="this.dialogVisible = true" @setSort="setSort" :sort="sort"></TableMenu>
        <TableItem v-if="filteredList.length > 0" v-for="el in filteredList" @saveChanges="saveChanges" :key="el.uid"
          :item="el" />
        <div v-else>Пусто</div>

      </table>

      <Dialog v-model:show="dialogVisible">
        <div class="filter">
          <h2>Фильтрация данных</h2>
          <ul class="filter__list">
            <li>
              <span>Поиск по uid</span>
              <input v-model="searchValue.uid" placeholder="0496344c-6755-d715-c132-65fe4be1d9f4">
            </li>
            <li>
              <span>Поиск по name</span>
              <input v-model="searchValue.name" placeholder="Имя">
            </li>
            <li>
              <span>Поиск по IP-address</span>
              <input v-model="searchValue.ipaddres" placeholder="255.255.255.255">
            </li>
            <li>
              <span>Поиск по serialnumber</span>
              <input v-model="searchValue.serialnumber" placeholder="ASDYAHBS13U84H6ASLU">
            </li>
            <li>
              <span>Поиск по macaddres</span>
              <input v-model="searchValue.macaddres" placeholder="FF:FF:FF:FF:FF:00">
            </li>
          </ul>
        </div>
      </Dialog>
    </div>
  </div>
</template>
<script>
import Dialog from "./components/Dialog.vue"
import TableItem from "./components/TableItem.vue"
import TableMenu from "./components/TableMenu.vue"
import Spinner from "./components/Spinner.vue"

import axios from "axios";
export default {
  components: {
    Dialog,
    TableItem,
    TableMenu,
    Spinner,
  },
  data() {
    return {
      currentPage: 0,
      fetching: false,
      stopFetching: false,
      maxPages: 100,
      elementsOnPage: 30,
      list: [],
      dialogVisible: false,
      sort: {
        name: '',
        ascending: true,
      },
      searchValue: {
        uid: "",
        name: "",
        ipaddres: "",
        serialnumber: "",
        macaddres: "",
      },
    }
  },
  methods: {
    showDialog() {
      this.dialogVisible = true
    },
    scrollHandler(e) {
      if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
        this.loadItems()
      }
    },
    setSort(name, ascending) {
      this.sort.name = name
      this.sort.ascending = ascending
    },
    saveChanges(inputs) {
      this.list = this.list.map(i => {
        return i.uid === inputs.uid ? inputs : i
      })
    },
    async loadItems() {

      if (this.fetching || this.stopFetching) return
      this.fetching = true
      this.currentPage += 1
      const { data } = await axios.get(`http://localhost:3000/testList?_page=${this.currentPage}&_limit=${this.elementsOnPage}`)
      if (data.length < 30 || this.currentPage === this.maxPages) {
        this.stopFetching = true
      }
      this.list = [...this.list, ...data]
      this.fetching = false
    }
  },
  mounted() {
    this.loadItems()
    document.addEventListener('scroll', this.scrollHandler)
  },
  unmounted() {
    document.removeEventListener('scroll', this.scrollHandler)
  },
  computed: {
    filteredList() {
      let tempList = this.list

      // Поиск по input
      if (this.searchValue != '' && this.searchValue) {
        tempList = tempList.filter((item) => {
          const sameUid = item.uid.toUpperCase().includes(this.searchValue.uid.toUpperCase())
          const sameName = item.name.toUpperCase().includes(this.searchValue.name.toUpperCase())
          const sameIpaddres = item.ipaddres.toUpperCase().includes(this.searchValue.ipaddres.toUpperCase())
          const sameSerialnumber = item.serialnumber.toUpperCase().includes(this.searchValue.serialnumber.toUpperCase())
          const sameMacaddres = item.macaddres.toUpperCase().includes(this.searchValue.macaddres.toUpperCase())

          return sameUid && sameName && sameIpaddres && sameSerialnumber && sameMacaddres
        })
      }
      // Сортировка
      tempList = tempList.sort((a, b) => {
        const sortingMultiplier = this.sort.ascending ? -1 : 1
        if (this.sort.name == 'ipaddres') {

          return a.ipaddres < b.ipaddres ? sortingMultiplier : -sortingMultiplier
        } else if (this.sort.name == 'uid') {
          return a.uid < b.uid ? sortingMultiplier : -sortingMultiplier
        }
        else if (this.sort.name == 'name') {
          return a.name < b.name ? sortingMultiplier : -sortingMultiplier
        }
        else if (this.sort.name == 'serialnumber') {
          return a.serialnumber < b.serialnumber ? sortingMultiplier : -sortingMultiplier
        }
        else if (this.sort.name == 'macaddres') {
          return a.macaddres < b.macaddres ? sortingMultiplier : -sortingMultiplier
        }
      })
      return tempList
    }
  },
  provide: {
    tableList: ["uid", "name", "ipaddres", "serialnumber", "macaddres"]
  }
}

</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";

* {
  margin: 0px;
  padding: 0px;
  font-weight: normal;
}

ul {
  list-style: none;
  padding: 0px 0px 0px 0px;
}

#app {
  min-height: 100vh;
  background: rgb(177, 177, 177);
}

.app {
  max-width: 1300px;
  margin: 0 auto;
  padding: 40px 0px;
}

td {
  padding: 15px 7px;
  text-align: left;
}

td {
  border: 1px solid black;
}

table {
  border-collapse: collapse;
}

.filter__btn {
  margin-top: 20px;
}

.app__list {
  border: 1px solid black;
}


.filter__list>li {
  margin-top: 20px;
}

.filter__list span {
  margin-right: 5px;
}


.app__title {
  font-size: 40px;
}

.item__options:hover {
  color: red;
  cursor: pointer;
  transition: all ease 0.3s;
}

.pagination {
  margin-top: 20px;
  justify-content: center;
}

.page-link {
  cursor: pointer;
  transition: all ease .4s;
}

.page-link:hover {
  background-color: rgba(3, 3, 194, 0.245);
}
</style>