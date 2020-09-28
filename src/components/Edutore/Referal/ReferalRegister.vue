<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <table class="table table-sm table-striped table-hover">
            <thead>
              <tr>
                <th>No</th>
                <th>Kode Referal</th>
                <th>Sekolah</th>
                <th>Kelas</th>
                <th>Sub Kelas</th>
                <th>Status</th>
                <th style="width:35%">Link</th>
                <th>Ubah</th>
                <th>Hapus</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, i) in items">
                <tr :key="item.id">
                  <td>{{ (currentPage - 1) * perPage + ++i }}</td>
                  <td>{{ item.referal_code }}</td>
                  <td>{{ item.school }}</td>
                  <td>{{ item.kelas }}</td>
                  <td>{{ item.sub_kelas }}</td>
                  <td>
                    <span v-if="item.actived" class="badge badge-success"> Active </span>
                    <span v-else class="badge badge-danger"> Inactive</span>
                  </td>
                  <td>
                    <input
                      type="text"
                      name=""
                      :value="
                        basUrl +
                          'referal_code=' +
                          item.referal_code +
                          '&school=' +
                          item.school +
                          '&kelas=' +
                          item.kelas +
                          '&sub_kelas=' +
                          item.sub_kelas +
                          '&link_id' +
                          item._id
                      "
                      :id="i"
                      disabled
                      class="form-control"
                    />
                    <button class="btn btn-sm btn-dark" @click="copyLink(i)">
                      Copy
                    </button>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReferralRegister",
  data() {
    return {
      items: [],
      token: null,
      err: null,
      currentPage: 1,
      perPage: 100,
      basUrl: "https://tryout.edutore.net/register?"
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this.actionGetReferal();
  },
  methods: {
    actionGetReferal() {
      this.$axios
        .get("referal-register", { headers: { "x-access-token": this.token } })
        .then(response => {
          this.items = response.data.data;
        })
        .catch(err => {
          this.err = err.response.data ? err.response.data.message : "Opps Something Wrong";
        });
    },
    copyLink(id) {
      var copyText = document.getElementById(id);
      //var copyText = id;

      /* Select the text field */
      copyText.select();
      copyText.setSelectionRange(0, 99999); /*For mobile devices*/

      /* Copy the text inside the text field */
      document.execCommand("copy");

      /* Alert the copied text */
      alert("Copied the text: " + copyText.value);
    }
  }
};
</script>

<style scoped></style>
