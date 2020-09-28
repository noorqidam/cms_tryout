export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "fa fa-dashboard",
      badge: {
        variant: "primary"
        // text: 'NEW'
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
      url: "/bank-soals",
      icon: "fa fa-university"
    },
    {
      name: "Ujian",
      url: "/ujian",
      icon: "fa fa-leanpub",
      children: [
        {
          name: "Category",
          url: "/category-ujian",
          icon: "fa fa-chevron-right"
        },
        {
          name: "Buat Ujian",
          url: "/ujian/buat-ujian",
          icon: "fa fa-pencil"
        },
        {
          name: "List Ujian",
          url: "/ujian",
          icon: "fa fa-list-alt"
        }
      ]
    },
    {
      name: "Quiz",
      url: "/quiz",
      icon: "fa fa-leanpub",
      children: [
        {
          name: "Category",
          url: "/category-quiz",
          icon: "fa fa-chevron-right"
        },
        {
          name: "Buat Quiz",
          url: "/quiz/buat-quiz",
          icon: "fa fa-pencil"
        },
        {
          name: "List Quiz",
          url: "/quiz/semua-quiz",
          icon: "fa fa-list-alt"
        }
      ]
    },
    {
      name: "Campaign",
      url: "/campaign",
      icon: "fa fa-bullhorn"
    },
    {
      name: "Reports",
      url: "/reports",
      icon: "fa fa-bar-chart",
      children: [
        {
          name: "Ujian",
          url: "/report-ujian",
          icon: "fa fa-leanpub"
        },
        {
          name: "Quiz",
          url: "/report-quiz",
          icon: "fa fa-leanpub"
        }
      ]
    },
    {
      title: true,
      name: "Publisher",
      wrapper: {
        element: "span",
        attributes: {}
      },
      class: ""
    },
    {
      name: "publishers",
      url: "/list-publishers",
      icon: "fa fa-book"
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
      url: "/live-test",
      icon: "fa fa-leanpub"
    },
    {
      name: "Live Quiz",
      url: "/live-quiz",
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
      url: "/soal",
      icon: "fa fa-leanpub",
      children: [
        {
          name: "Soal",
          url: "/analytics/soal-score",
          icon: "fa fa-star"
        }
      ]
    }
  ]
};
