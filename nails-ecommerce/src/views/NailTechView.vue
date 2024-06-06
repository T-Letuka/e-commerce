<template>
  <div class="container mt-5 nails-table">
    <h2 class="mb-4">Nail Techs</h2>
    <div class="table-responsive">
      <table class="table table-striped table-bordered techs">
        <thead>
          <tr>
            <th>Name</th>
            <th>Tiktok</th>
            <th>Instragram</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Saint Nails</td>
            <td>
              <RouterLink to="https://www.tiktok.com/@_saint_nails_"
                ><i class="bi bi-tiktok"></i
              ></RouterLink>
            </td>
            <td>
              <RouterLink to="https://www.instagram.com/_saint_nails_/"
                ><i class="bi bi-instagram"></i
              ></RouterLink>
            </td>
          </tr>
          <tr>
            <td>KayBeauty_bar</td>
            <td>
              <RouterLink to="https://www.tiktok.com/@kaybeauty_bar"
                ><i class="bi bi-tiktok"></i
              ></RouterLink>
            </td>
            <td>
              <RouterLink to="https://www.instagram.com/"
                ><i class="bi bi-instagram"></i
              ></RouterLink>
            </td>
          </tr>
          <tr>
            <td>Lesego's Beauty Bar</td>
            <td>
              <RouterLink to="https://www.tiktok.com/@lesegosbeautybar"
                ><i class="bi bi-tiktok"></i
              ></RouterLink>
            </td>
            <td>
              <RouterLink to="https://www.instagram.com/"
                ><i class="bi bi-instagram"></i
              ></RouterLink>
            </td>
          </tr>
          <tr>
            <td>Nail Inspo</td>
            <td>
              <RouterLink to="https://www.tiktok.com/@_nailsidea"
                ><i class="bi bi-tiktok"></i
              ></RouterLink>
            </td>
            <td>
              <RouterLink to="https://www.instagram.com/"
                ><i class="bi bi-instagram"></i
              ></RouterLink>
            </td>
          </tr>

          <tr>
            <td>Magnolia_verde.beauty</td>
            <td>
              <RouterLink to="https://www.tiktok.com/@magnolia_verde.beauty"
                ><i class="bi bi-tiktok"></i
              ></RouterLink>
            </td>
            <td>
              <RouterLink to="https://www.instagram.com/"
                ><i class="bi bi-instagram"></i
              ></RouterLink>
            </td>
          </tr>
          <tr>
            <td>Mike's Nails</td>
            <td>
              <RouterLink to="https://www.tiktok.com/@mikeagyeinails"
                ><i class="bi bi-tiktok"></i
              ></RouterLink>
            </td>
            <td>
              <RouterLink to="https://www.instagram.com/"
                ><i class="bi bi-instagram"></i
              ></RouterLink>
            </td>
          </tr>
          <tr>
            <td>Ntsakobeauty</td>
            <td>
              <RouterLink to="https://www.tiktok.com/@ntsakobeauty"
                ><i class="bi bi-tiktok"></i
              ></RouterLink>
            </td>
            <td>
              <RouterLink to="https://www.instagram.com/"
                ><i class="bi bi-instagram"></i
              ></RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
.techs {
  margin-top: 50px;
  color: black;
  box-shadow: 0px 0 13px rgba(236, 4, 217, 0.3);
}
.nails-table {
  padding-left: 35px;
}
@media (max-width: 1440px) {
  .nails-table {
    padding-left: 5%;
  }
}
@media (max-width: 768px) {
  .nails-table {
    padding-left: 20%;
  }
}
</style>
