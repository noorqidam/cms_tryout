export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "fa fa-dashboard",
      badge: {
        variant: "primary",
        text: "NEW"
      }
    },
    {
      title: true,
      name: "Main Menu",
      wrapper: {
        element: "span",
        attributes: {}
      },
      class: ""
    },
    {
      name: "Bank Soal",
      url: "/p/banksoals",
      icon: "fa fa-university"
    },
    {
      name: "Ujian",
      url: "/p/ujian",
      icon: "fa fa-leanpub",
      children: [
        {
          name: "Buat Ujian",
          url: "/p/ujian/buat-ujian",
          icon: "fa fa-pencil"
        },
        {
          name: "Ujian",
          url: "/p/ujian",
          icon: "fa fa-list-alt"
        }
      ]
    },
    {
      name: "Quiz",
      url: "/p/quiz",
      icon: "fa fa-leanpub",
      children: [
        {
          name: "Buat Quiz",
          url: "/p/quiz/buat-quiz",
          icon: "fa fa-pencil"
        },
        {
          name: "Quiz",
          url: "/p/quiz/semua-quiz",
          icon: "fa fa-list-alt"
        }
      ]
    },
    {
      title: true,
      name: "Monitoring",
      wrapper: {
        element: "span",
        attributes: {}
      },
      class: ""
    },
    {
      name: "Live Ujian",
      url: "/p/live-ujian",
      icon: "fa fa-leanpub"
    },
    {
      title: true,
      name: "Analytics",
      wrapper: {
        element: "span",
        attributes: {}
      },
      class: ""
    },
    {
      name: "User",
      url: "/user",
      icon: "fa fa-users",
      children: [
        {
          name: "Scoring",
          url: "/analytics/user-score",
          icon: "fa fa-star"
        }
      ]
    },
    {
      name: "Soal",
      url: "/p/soal",
      icon: "fa fa-leanpub",
      children: [
        {
          name: "Soal",
          url: "/analytics/soal-score",
          icon: "fa fa-star"
        }
      ]
    },
    {
      name: "Report",
      url: "/publisher-report",
      icon: "fa fa-leanpub",
      children: [
        {
          name: "Mutasi",
          url: "/p/mutasi",
          icon: "fa fa-exchange"
        }
      ]
    }
  ]
};
