<template>
  <tr class="likedItem">
    <th scope="row">{{ index + 1 }}</th>
    <td><img :src="item.image" alt="" class="img-fluid" /></td>
    <td>
      <RouterLink :to="`/designs/${item.name}`">{{ item.name }}</RouterLink>
    </td>
    <td>
      <a href="#"
        ><i class="bi bi-trash" @click.stop.prevent="emitRemove"></i
      ></a>
    </td>
  </tr>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["remove"]);

const emitRemove = () => {
  emit("remove", props.item.id);
};

// Log the item to check if the data structure is correct
console.log(props.item);
</script>
<style scoped>
.likedItem {
  margin-bottom: 20px;
}
.likedItem tr {
  margin-bottom: 20px !important;
}
.likedpaged td,
.likedItem th {
  background: transparent;
  color: black;
  font-size: 1.2rem;
}
.likedItem a {
  color: black;
  font-size: 1.6rem;
}
.likedItem img {
  width: 120px;
  height: 70px;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
}
.likedItem i {
  font-size: 2rem;
}
</style>
