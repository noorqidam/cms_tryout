import Vue from "vue";
import Router from "vue-router";
import PageNotFound from "./views/NotFound.vue";
import Full from "./views/Full.vue";
// const HomePublisher = () => import("./views/Home.vue");

const Home = () => import("./components/Home.vue");
const DashboardPublisher = () => import("./components/Publishers/dashboard.vue");
const Login = () => import("./components/Auth/login.vue");
const BankSoal = () => import("./components/Edutore/banksoal/BankSoal.vue");
const CreateBankSoal = () => import("./components/Edutore/banksoal/createBankSoal.vue");
const BankSoalEdit = () => import("./components/Edutore/banksoal/editBankSoal.vue");
const Daftarujian = () => import("./components/Edutore/ujian/indexUjian.vue");
// const DetailUjian = () => import("./components/Edutore/ujian/DetailUjian.vue");
const DetailUjianAdmin = () => import("./components/Edutore/ujian/DetailUjianAdmin.vue");
const ReportPesertaUjian = () => import("./components/Edutore/ujian/ReportPesertaUjian.vue");
const ReportSesiUjian = () => import("./components/Edutore/ujian/ReportSesiUjian.vue");
const ReportNilaiPesertaUjian = () => import("./components/Edutore/ujian/ReportNilaiPesertaUjian.vue");
const BuatUjian = () => import("./components/Edutore/ujian/CreateUjian.vue");
const editUjian = () => import("./components/Edutore/ujian/editUjian.vue");
const Soaltoadd = () => import("./components/Edutore/ujian/soal_to_add.vue");
const AddSoalSesiUjian = () => import("./components/Edutore/ujian/AddSoalSesiUjian.vue");
const SesiUjian = () => import("./components/Edutore/ujian/SesiUjian.vue");
const JadwalSesiUjian = () => import("./components/Edutore/ujian/JadwalSesiUjian.vue");
const CreateJadwalSesiUjian = () => import("./components/Edutore/ujian/CreateJadwalSesiUjian.vue");
const EditJadwalSesiUjianAdmin = () => import("./components/Edutore/ujian/EditJadwalSesiUjian.vue");
const ReviewSesiUjian = () => import("./components/Edutore/ujian/ReviewSesiUjian.vue");
const ReviewPesertaUjian = () => import("./components/Edutore/ujian/ReviewPesertaUjian.vue");
const ReviewNilaiPesertaUjian = () => import("./components/Edutore/ujian/ReviewNilaiPesertaUjian.vue");
const CreateQuiz = () => import("./components/Edutore/quiz/CreateQuiz.vue");
const QuizList = () => import("./components/Edutore/quiz/indexQuiz.vue");
const DetailQuiz = () => import("./components/Edutore/quiz/DetailQuiz.vue");
const ReviewPesertaQuiz = () => import("./components/Edutore/quiz/ReviewPesertaQuiz.vue");
const ReviewNilaiPesertaQuiz = () => import("./components/Edutore/quiz/ReviewNilaiPesertaQuiz.vue");
const BankSoalQuiz = () => import("./components/Edutore/quiz/BankSoalQuiz.vue");
const ReportPesertaQuiz = () => import("./components/Edutore/quiz/ReportPesertaQuiz.vue");
const ReportPesertaQuizRealtime = () => import("./components/Edutore/quiz/ReportPesertaQuizRealtime.vue");
const ReportNilaiPesertaQuiz = () => import("./components/Edutore/quiz/ReportNilaiPesertaQuiz.vue");
const ReportNilaiPesertaQuizRealtime = () =>
  import("./components/Edutore/quiz/ReportNilaiPesertaQuizRealtime.vue");
const CartSoal = () => import("./components/Edutore/ujian/CartSoal.vue");
const CartSesiUjian = () => import("./components/Edutore/ujian/CartSesiUjianSoal.vue");
const PublisherList = () => import("./components/Edutore/publisher/publisher.vue");
const CreatePublisher = () => import("./components/Edutore/publisher/createPublisher.vue");
const EditPublisher = () => import("./components/Edutore/publisher/editPublisher.vue");
const CategoryQuiz = () => import("./components/Edutore/category/quiz.vue");
const CategoryUjian = () => import("./components/Edutore/category/ujian.vue");
const reportQuiz = () => import("./components/Edutore/reports/reportquiz.vue");
const reportQuizDetail = () => import("./components/Edutore/reports/reportDetailquiz.vue");
const reportQuizDetailRealtime = () => import("./components/Edutore/reports/reportDetailQuizRealtime.vue");
const reportUjian = () => import("./components/Edutore/reports/reportujian.vue");
const reportUjianDetail = () => import("./components/Edutore/reports/reportDetailUjian.vue");
const Campaign = () => import("./components/Edutore/campaign/Campaign.vue");
const BooksEdutore = () => import("./components/Edutore/Books/Books.vue");
const DetailsBooks = () => import("./components/Edutore/Books/DetailsBook.vue");
const PaketSoalAdmin = () => import("./components/Edutore/Books/PaketSoal/paketSoal.vue");
const ReferalRegister = () => import("./components/Edutore/Referal/ReferalRegister.vue");
const TrashUjian = () => import("./components/Edutore/trash/trashUjian.vue");
const TrashQuiz = () => import("./components/Edutore/trash/trashQuiz.vue");
const CreateReferalRegister = () => import("./components/Edutore/Referal/CreateReferalRegister.vue");

/**
 * Partner Router
 */
const BanksoalPartner = () => import("./components/Publishers/BankSoal/BankSoalPublisher.vue");
const DaftarUjianPublisher = () => import("./components/Publishers/ujian/indexUjianPublisher.vue");
const DetailUjianPublisher = () => import("./components/Publishers/ujian/DetailUjianPublisher.vue");
const BuatUjianPublisher = () => import("./components/Publishers/ujian/createUjianPublisher.vue");
const AddSoalSesiUjianPublisher = () => import("./components/Publishers/ujian/AddSoalSesiUjianPublisher.vue");
const SesiUjianPublisher = () => import("./components/Publishers/ujian/SesiUjianPublisher.vue");
const CartSoalPublisher = () => import("./components/Publishers/ujian/CartSoalPublisher.vue");
const CartSesiUjianPublisher = () => import("./components/Publishers/ujian/CartSesiUjianSoalPublisher.vue");
const CreateQuizPublisher = () => import("./components/Publishers/quiz/createQuizPublisher.vue");
const QuizListPublisher = () => import("./components/Publishers/quiz/indexQuizPublisher.vue");
const DetailQuizPublisher = () => import("./components/Publishers/quiz/detailQuizPublisher.vue");
const CreateBanksSoalPublisher = () => import("./components/Publishers/BankSoal/CreatebankSoal.vue");
const editBankSoalPublisher = () => import("./components/Publishers/BankSoal/editBankSoalpublisher.vue");
const BankSoalQuizPublisher = () => import("./components/Publishers/quiz/bankSoalQuizPublisher.vue");
const BankSoalQuizUpdatePublisher = () =>
  import("./components/Publishers/quiz/bankSoalQuizUpdatePublisher.vue");
const CartSoalQuizPublisher = () => import("./components/Publishers/quiz/CartSoalQuizPublisher.vue");
const CartEditSoalQuizPublisher = () => import("./components/Publishers/quiz/CartEditSoalQuizPublisher.vue");
const ReportQuizPublisher = () => import("./components/Publishers/quiz/reportQuizPublisher.vue");
const ReportDetailQuizByPeserta = () => import("./components/Publishers/quiz/reportDetailQuizByUser.vue");
const BankSoalUjianPublisher = () => import("./components/Publishers/ujian/BankSoalUjianPublisher.vue");
const UserPublisher = () => import("./components/Publishers/users/UserList.vue");
const CrateUserPublisher = () => import("./components/Publishers/users/UserCreate.vue");
const ReportUjianPublisher = () => import("./components/Publishers/report/ReportUjianPublisher.vue");
const DetailReportUjianPublisher = () =>
  import("./components/Publishers/report/DetailReportUjianPublisher.vue");
const ReportQuizPublisherSide = () => import("./components/Publishers/report/ReportQuizPublisher.vue");
const ReviewNilaiPesertaUjianPublisher = () =>
  import("./components/Publishers/ujian/review/ReviewNilaiEssay.vue");
const DetailReportQuizPublisher = () =>
  import("./components/Publishers/report/DetailReportQuizPublisher.vue");
const DetailreportQuizRealtimePublisher = () => import("./components/Publishers/report/Quiz/realtime.vue");
const MonitoringLiveUjianPublisher = () =>
  import("./components/Publishers/monitoring/tryout/IndexTryout.vue");
const DetailUjianLivePublisher = () =>
  import("./components/Publishers/monitoring/tryout/DetailLiveTryout.vue");
const MonitoringLiveQuizPublisher = () => import("./components/Publishers/monitoring/quiz/IndexQuizLive.vue");
const DetailQuizLivePublisher = () => import("./components/Publishers/monitoring/quiz/DetailLiveQuiz.vue");
const TriggerSoalQuizPublisher = () => import("./components/Publishers/monitoring/quiz/TriggerSoalQuiz.vue");
const JadwalSesiUjianPublisher = () => import("./components/Publishers/ujian/JadwalSesiUjian.vue");
const CreateeJadwalSesiUjian = () => import("./components/Publishers/ujian/CreateJadwalUjian.vue");
const EditJadwalSesiUjian = () => import("./components/Publishers/ujian/EditJadwalSesiUjian.vue");
const BooksPublisher = () => import("./components/Publishers/Books/Books.vue");
const DetailBookPublisher = () => import("./components/Publishers/Books/BookDetail.vue");
const ModuleSoalPublisher = () =>
  import("./components/Publishers/Books/books_theme/paket_soal/paket_soal.vue");

const MonitoringLiveTest = () => import("./components/monitoring/tryout/IndexTryout.vue");
const DetailUjianLive = () => import("./components/monitoring/tryout/DetailLiveTryout.vue");
const MonitoringLiveQuiz = () => import("./components/monitoring/quiz/IndexQuizLive.vue");
const DetailQuizLive = () => import("./components/monitoring/quiz/DetailLiveQuiz.vue");
const TriggerSoalQuiz = () => import("./components/monitoring/quiz/TriggerSoalQuiz.vue");
const CartSoalQuiz = () => import("./components/Edutore/quiz/CartSoalQuiz.vue");
const MutasiRekening = () => import("./components/Publishers/mutasi/mutasi.vue");

const ReportSesiUjianPublisher = () => import("./components/Publishers/ujian/report/sesiujian.vue");
const ReviewPesertaUjianPublisher = () =>
  import("./components/Publishers/ujian/review/ReviewPesertaEssay.vue");
const ReportDetailSesiUjianPublisher = () => import("./components/Publishers/ujian/report/detailsesi.vue");
const UploadBankSoalPublisher = () => import("./components/Publishers/BankSoal/UploadBankSoal.vue");
/** Review Ujian Partner or publisher */
// const ReviewSesiUjianPublisher = () => import("./components/Publishers/ujian/review/ReviewSesiUjian.vue");
const LisReviewSesiUjianPublisher = () =>
  import("./components/Publishers/ujian/review/ListReviewDetailSesiUjian.vue");
// const AssesmentSesiUjianPublisher = () =>
//   import("./components/Publishers/ujian/review/AssesmentSesiUjian.vue");

const siswaPublisher = () => import("./components/Publishers/siswa/siswa.vue");
const trashUjianPublisher = () => import("./components/Publishers/trash/trashUjianPublisher.vue");
const trashQuizPublisher = () => import("./components/Publishers/trash/trashQuizPublisher.vue");
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "open active",
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/dashboard",
      component: Full,
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: Home
        },
        { path: "/category-quiz", name: "category-quiz", component: CategoryQuiz },
        { path: "/category-ujian", name: "category-ujian", component: CategoryUjian },
        {
          path: "/banksoals",
          name: "Bank-soal",
          component: BankSoal,
          meta: { requiresAdmin: true }
        },
        {
          path: "/create-bank-soal",
          name: "create-Bank-soal",
          component: CreateBankSoal,
          meta: { requiresAdmin: true }
        },
        {
          path: "/edit-bank-soal",
          name: "edit-Bank-soal",
          component: BankSoalEdit,
          meta: { requiresAdmin: true }
        },
        { path: "/ujian", name: "semua-ujian", component: Daftarujian },
        { path: "/ujian/create", name: "create-ujian", component: BuatUjian },
        // { path: "/ujian/ujian-detail", name: "detail-ujian", component: DetailUjian },
        { path: "/ujian/ujian-detail/:ujian_id", name: "detail-ujian", component: DetailUjianAdmin },
        { path: "/ujian/report-sesi-ujian/:ujian_id", name: "report-sesi-ujian", component: ReportSesiUjian },
        {
          path: "/ujian/report-peserta-ujian",
          name: "report-peserta-ujian",
          component: ReportPesertaUjian
        },
        {
          path: "/ujian/report-nilai-peserta-ujian",
          name: "report-nilai-peserta-ujian",
          component: ReportNilaiPesertaUjian
        },
        { path: "/edit-ujian", name: "edit-ujian", component: editUjian },
        { path: "/ujian-add-soal", name: "tambah-soal-ujian", component: Soaltoadd },
        { path: "/sesi-soal-ujian", name: "sesi-soal-ujian", component: AddSoalSesiUjian },
        { path: "/ujian/detail-sesi-ujian", name: "detail-sesi-ujian", component: SesiUjian },
        {
          path: "/ujian/jadwal-sesi-ujian/:ujian_id",
          name: "jadwal-sesi-ujian",
          component: JadwalSesiUjian
        },
        {
          path: "/ujian/create-jadwal-sesi-ujian/:ujian_id",
          name: "Create Jadwal Sesi Ujian",
          component: CreateJadwalSesiUjian
        },
        {
          path: "/ujian/edit-jadwal-sesi-ujian/:ujian_id",
          name: "Edit Jadwal Sesi Ujian",
          component: EditJadwalSesiUjianAdmin
        },
        { path: "/ujian/review-sesi-ujian", name: "review-sesi-ujian", component: ReviewSesiUjian },
        { path: "/ujian/review-peserta-ujian", name: "review-peserta-ujian", component: ReviewPesertaUjian },
        {
          path: "/ujian/review-nilai-peserta-ujian",
          name: "review-nilai-peserta-ujian",
          component: ReviewNilaiPesertaUjian
        },
        { path: "/draft-soal-ujian", name: "draft-soal-ujian", component: CartSoal },
        { path: "/draft-sesi-soal-ujian", name: "draft-sesi-soal-ujian", component: CartSesiUjian },
        { path: "/quiz", name: "quiz-list", component: QuizList },
        { path: "/quiz/create", name: "create-quiz", component: CreateQuiz },
        { path: "/quiz/quiz-detail", name: "Detail-quiz", component: DetailQuiz },
        { path: "/quiz/report-peserta-quiz", name: "report-peserta-quiz", component: ReportPesertaQuiz },
        {
          path: "/quiz/report-peserta-quiz-realtime/:quiz_id",
          name: "report-peserta-quiz-realtime-admin",
          component: ReportPesertaQuizRealtime
        },
        {
          path: "/quiz/report-nilai-peserta-quiz",
          name: "report-nilai-peserta-quiz",
          component: ReportNilaiPesertaQuiz
        },
        {
          path: "/quiz/report-nilai-peserta-quiz-realtime/:quiz_id/:user_id",
          name: "report-nilai-peserta-quiz-realtime",
          component: ReportNilaiPesertaQuizRealtime
        },
        { path: "/quiz/review-peserta-quiz", name: "review-peserta-quiz", component: ReviewPesertaQuiz },
        {
          path: "/quiz/review-nilai-peserta-quiz",
          name: "review-nilai-peserta-quiz",
          component: ReviewNilaiPesertaQuiz
        },
        { path: "/report/quiz", name: "report-quiz", component: reportQuiz },
        { path: "/report/ujian", name: "report-ujian", component: reportUjian },
        { path: "/report/detail-quiz/:quiz_id", name: "report-detail-quiz", component: reportQuizDetail },
        {
          path: "/report/detail-quiz-realtime/:quiz_id",
          name: "report-detail-quiz-realtime-admin",
          component: reportQuizDetailRealtime
        },
        { path: "/report/detail-ujian/:ujian_id", name: "report-detail-ujian", component: reportUjianDetail },
        { path: "/campaign", name: "Campaign", component: Campaign },
        { path: "/books", name: "module-admin", component: BooksEdutore },
        { path: "/books/details-book/:module_id", name: "details-module", component: DetailsBooks },
        {
          path: "/books/details-book/:module_id/paket-soal",
          name: "paket-soal-admin",
          component: PaketSoalAdmin
        },
        { path: "/live-ujian", name: "live-test", component: MonitoringLiveTest },
        { path: "/live-quiz", name: "live-quiz", component: MonitoringLiveQuiz },
        { path: "/live-ujian/detail-peserta", name: "Detail-live-test", component: DetailUjianLive },
        { path: "/live-quiz/detail-peserta", name: "Detail-live-quiz", component: DetailQuizLive },
        { path: "/live-quiz/trigger-quiz", name: "live-trigger-soal-quiz", component: TriggerSoalQuiz },
        { path: "/bank-soal-quiz", name: "Bank-Soal-Quiz", component: BankSoalQuiz },
        { path: "/cart-soal-quiz", name: "cart-soal-quiz", component: CartSoalQuiz },
        // monitoring
        { path: "/publisher", name: "list-publisher", component: PublisherList },
        { path: "/publisher/create", name: "create-publisher", component: CreatePublisher },
        { path: "/publisher/edit/:id", name: "edit-publisher", component: EditPublisher },
        { path: "/referal-register", name: "referal register", component: ReferalRegister },
        { path: "/trash/ujian", name: "Trash Ujian", component: TrashUjian },
        { path: "/trash/quiz", name: "Trash Quiz", component: TrashQuiz },
        {
          path: "/referal-register/create",
          name: "Cerate referal register",
          component: CreateReferalRegister
        }
      ],
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: "/p",
      name: "Publisher Home",
      redirect: "/p/dashboard",
      component: Full,
      children: [
        {
          path: "dashboard",
          name: "Publisher Dashboard",
          component: DashboardPublisher
        },
        {
          path: "banksoals",
          name: "Bank Soal Publisher",
          component: BanksoalPartner
        },
        {
          path: "/p/create-bank-soal",
          name: "Publisher Create Bank Soal",
          component: CreateBanksSoalPublisher
        },
        {
          path: "/p/edit-bank-soal",
          name: "Publisher Edit Bank Soal",
          component: editBankSoalPublisher
        },
        {
          path: "/p/banksoals/upload",
          name: "upload banksoal",
          component: UploadBankSoalPublisher
        },
        {
          path: "ujian",
          name: "Daftar Ujian Publisher",
          component: DaftarUjianPublisher
        },
        { path: "/p/category-quiz", name: "category-quiz-publisher", component: CategoryQuiz },
        { path: "/p/category-ujian", name: "category-ujian-publisher", component: CategoryUjian },
        {
          path: "ujian/create",
          name: "Buat Ujian Publisher",
          component: BuatUjianPublisher
        },
        {
          path: "ujian/ujian-detail",
          name: "Detail Ujian Publisher",
          component: DetailUjianPublisher
        },
        {
          path: "ujian/create-sesi-ujian",
          name: "Create Sesi Ujian Publisher",
          component: BankSoalUjianPublisher
        },
        {
          path: "ujian/banksoal-sesi-ujian",
          name: "Bank Soal Sesi Ujian Publisher",
          component: AddSoalSesiUjianPublisher
        },
        {
          path: "/p/ujian/sesi-ujian/:ujian_id/:sesi_id",
          name: "Sesi Ujian Publisher",
          component: SesiUjianPublisher
        },
        {
          path: "/p/ujian/cart-soal-ujian",
          name: "Cart Soal Ujian Publisher",
          component: CartSoalPublisher
        },
        {
          path: "ujian/update-sesi-soal-ujian",
          name: "Draft Sesi Soal Ujian Publisher",
          component: CartSesiUjianPublisher
        },
        {
          path: "ujian/jadwal-sesi-ujian/:ujian_id",
          name: "jadwal sesi ujian",
          component: JadwalSesiUjianPublisher
        },
        {
          path: "ujian/create-jadwal-sesi-ujian/:ujian_id",
          name: "Jadwal Sesi Ujian",
          component: CreateeJadwalSesiUjian
        },
        {
          path: "ujian/edit-jadwal-sesi-ujian/:ujian_id",
          name: "Ubah Jadwal Sesi Ujian",
          component: EditJadwalSesiUjian
        },
        {
          path: "ujian/report-ujian-sesi/:ujian_id",
          name: "report ujian Sesi",
          component: ReportSesiUjianPublisher
        },
        {
          path: "ujian/report-detail-ujian-sesi/:ujian_id/sesi/:sesi_id",
          name: "report Detail ujian Sesi",
          component: ReportDetailSesiUjianPublisher
        },
        // {
        //   path: "ujian/review-sesi-ujian/:ujian_id",
        //   name: "Review Sesi Ujian",
        //   component: ReviewSesiUjianPublisher
        // },
        {
          path: "ujian/review-sesi-ujian",
          name: "Review Sesi Ujian",
          component: ReviewPesertaUjianPublisher
        },
        {
          path: "ujian/review-sesi-ujian/:ujian_id/sesi/:sesi_id",
          name: "List Review Sesi Ujian",
          component: LisReviewSesiUjianPublisher
        },
        // {
        //   path: "ujian/assesment-sesi-ujian/:ujian_id/sesi/:sesi_id/user/:user_id",
        //   name: "Assesment Review Sesi Ujian",
        //   component: AssesmentSesiUjianPublisher
        // },
        {
          path: "ujian/assesment-sesi-ujian",
          name: "Assesment Review Sesi Ujian",
          component: ReviewNilaiPesertaUjianPublisher
        },
        {
          path: "/p/quiz",
          name: "Quiz List Publisher",
          component: QuizListPublisher
        },
        {
          path: "/p/quiz/create",
          name: "Buat Quiz Publisher",
          component: CreateQuizPublisher
        },
        {
          path: "/p/quiz/detail-quiz",
          name: "Detail Quiz Publisher",
          component: DetailQuizPublisher
        },
        {
          path: "/p/bank-soal-quiz",
          name: "Bank Soal Quiz Publisher",
          component: BankSoalQuizPublisher
        },
        {
          path: "/p/bank-soal-quiz-edit",
          name: "Edit Bank Soal Quiz",
          component: BankSoalQuizUpdatePublisher
        },
        {
          path: "/p/quiz/cart-soal-quiz",
          name: "Cart Soal Quiz Publisher",
          component: CartSoalQuizPublisher
        },
        {
          path: "/p/quiz/cart-edit-soal-quiz",
          name: "Cart Edit Soal Quiz Publisher",
          component: CartEditSoalQuizPublisher
        },
        {
          path: "/p/quiz/report-quiz/:quiz_id",
          name: "Report quiz Publisher",
          component: ReportQuizPublisher
        },
        {
          path: "/p/quiz/report-detail-quiz/:quiz_id",
          name: "report detail quiz",
          component: ReportDetailQuizByPeserta
        },
        {
          path: "/p/quiz/live-quiz-detail-peserta",
          name: "live quiz detail peserta",
          component: DetailQuizLivePublisher
        },
        {
          path: "/p/quiz/live-trigger-soal-quiz",
          name: "live trigger soal quiz",
          component: TriggerSoalQuizPublisher
        },
        {
          path: "report/ujian",
          name: "Report Ujian Publisher",
          component: ReportUjianPublisher
        },
        {
          path: "/p/report/detail-ujian/:ujian_id",
          name: "Detail Report Ujian Publisher",
          component: DetailReportUjianPublisher
        },
        {
          path: "report/quiz",
          name: "Report Quiz Publisher",
          component: ReportQuizPublisherSide
        },
        {
          path: "/p/report/detail-quiz/:quiz_id",
          name: "Detail Report Quiz Publisher",
          component: DetailReportQuizPublisher
        },
        {
          path: "/p/report/detail-quiz-realtime/:quiz_id",
          name: "Detail Report Quiz realtime Publisher",
          component: DetailreportQuizRealtimePublisher
        },
        {
          path: "/p/mutasi",
          name: "Publisher Mutasi",
          component: MutasiRekening
        },
        {
          path: "/p/setting/admin",
          name: "User",
          component: UserPublisher
        },
        { path: "/p/trash/ujian", name: "Trash Ujian Publisher", component: trashUjianPublisher },
        { path: "/p/trash/quiz", name: "Trash Quiz Publisher", component: trashQuizPublisher },
        {
          path: "/p/admin/create",
          name: "User Create",
          component: CrateUserPublisher
        },
        { path: "/p/live-ujian", name: "live ujian publisher", component: MonitoringLiveUjianPublisher },
        {
          path: "/p/ujian/live-ujian-detail-peserta",
          name: "live ujian detail peserta",
          component: DetailUjianLivePublisher
        },
        {
          path: "/p/siswa",
          name: "siswa",
          component: siswaPublisher
        },
        {
          path: "/p/ujian/report-nilai-peserta-ujian",
          name: "report-nilai-peserta-publisher",
          component: ReportNilaiPesertaUjian
        },
        { path: "/p/live-quiz", name: "live-quiz-publisher", component: MonitoringLiveQuizPublisher },
        { path: "/p/books", name: "Module publisher", component: BooksPublisher },
        { path: "/p/detail-book/:book_id", name: "Detail Book ", component: DetailBookPublisher },
        { path: "/p/detail-book/:book_id/paket-soal", name: "module soal ", component: ModuleSoalPublisher }
      ],
      meta: { requiresAuth: true, requiresPublisher: true }
    },
    { path: "/login", name: "login", component: Login },
    { path: "*", name: "notfound", component: PageNotFound }
  ]
});

router.beforeEach((to, from, next) => {
  console.log(`router => ${JSON.stringify(to.path)}`);
  const token = sessionStorage.getItem("session_token");
  const auth = sessionStorage.getItem("authorized");
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token || token === null) {
      console.log("Anda Belum Login");
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    } else if (to.matched.some(record => record.meta.requiresAdmin)) {
      if (auth === "EDUTORE") {
        console.log("Anda Menggunakan Akun Edutore");
        next();
      } else {
        console.log("Anda Bukan Admin Edutore");
        next({ path: "/p" });
      }
    } else if (to.matched.some(record => record.meta.requiresPublisher)) {
      if (auth === "PARTNER") {
        console.log("Ini Akun Publisher");
        next();
      } else {
        console.log("Anda Bukan Publisher");
        next({ path: "/" });
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
