<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <h3 class="h4 text-center p-2">Paket Soal : {{ paketsoal }}</h3>
        <div class="card-body">
          <form>
            <div class="form-group row">
              <label for="" class="col-sm-2"> <strong> Pertanyaan </strong> </label>
              <div class="col-md-9">
                <quillEditor
                  class="quill-editor"
                  name="metode_penelitian_view"
                  v-model="Form.metode_penelitian_view"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-2"> <strong> Image </strong> </label>
              <div class="col-sm-2">
                <input type="file" name="" id="" />
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-2"> <strong> Audio </strong> </label>
              <div class="col-sm-2">
                <input type="file" name="" id="" />
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-2"> <strong> Video </strong> </label>
              <div class="col-sm-2">
                <input type="file" name="" id="" />
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-2"> <strong> Bobot Pertanyaan </strong> </label>
              <div class="col-md-2">
                <input type="number" class="form-control" required />
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-2"> <strong> Jawaban </strong> </label>
              <div class="col-md-9">
                <quillEditor
                  class="quill-editor"
                  name="metode_penelitian_view"
                  v-model="Form.metode_penelitian_view"
                />
              </div>
              <div class="col-sm-3"></div>
            </div>

            <!-- <div class="form-group row">
              <label for="" class="col-sm-2"> <strong> Pertanyaan </strong>  </label>
              <div class="col-md-9">
                <quillEditor class="quill-editor" name="metode_penelitian_view" v-model="Form.metode_penelitian_view"/>
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-2"> <strong> Pertanyaan </strong>  </label>
              <div class="col-md-9">
                <quillEditor class="quill-editor" name="metode_penelitian_view" v-model="Form.metode_penelitian_view"/>
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-2"> <strong> Pertanyaan </strong>  </label>
              <div class="col-md-9">
                <quillEditor class="quill-editor" name="metode_penelitian_view" v-model="Form.metode_penelitian_view"/>
              </div>
            </div> -->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateSoal",
  data() {
    return {
      Form: {},
      paketsoal: ""
    };
  },
  methods: {
    _actionSave() {}
  },
  mounted() {
    this.paketsoal = this.$route.query.slug;
  }
};
</script>
