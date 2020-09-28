<script>
export default {
  props: {
    canOpenMultiple: {
      type: Boolean,
      default: true
    },
    defaultOpen: {
      type: Number
    }
  },
  data() {
    return {
      activeIndexes: {}
    };
  },
  created() {
    if (this.defaultOpen != null) {
      this.toggleItem(this.defaultOpen);
    }
  },
  mounted() {
    this.updateAccordionItems();
  },
  methods: {
    updateAccordionItems() {
      this.closeInactive();
      this.openActive();
    },
    closeInactive() {
      (this.$refs["item-content"] || []).forEach((el, i) => {
        if (!this.activeIndexes[i]) {
          el.style.overflow = "hidden";
          el.style.maxHeight = 0;
        }
      });
    },
    openActive() {
      Object.keys(this.activeIndexes).forEach(key => {
        if (!this.activeIndexes[key]) return;

        const activeItem = (this.$refs["item-content"] || [])[key];
        if (activeItem) {
          activeItem.style.maxHeight = activeItem.scrollHeight + "px";
        }
      });
    },
    toggleItem(index) {
      if (this.canOpenMultiple) {
        this.$set(this.activeIndexes, index, !this.activeIndexes[index]);
      } else {
        this.$set(this, "activeIndexes", {
          [index]: true
        });
      }
    },
    clickHandler(index) {
      this.toggleItem(index);
      this.$nextTick(() => {
        this.updateAccordionItems();
      });
    }
  },
  render(h) {
    const headerSlots = this.$slots["header"] || [];
    const contentSlots = this.$slots["content"] || [];
    const wrappedSlots = headerSlots.map((headerSlot, i) => {
      const header = h(
        "p",
        {
          class: "sui-accordion-item-header",
          on: {
            click: () => this.clickHandler(i)
          }
        },
        [headerSlot]
      );
      const content = h(
        "div",
        {
          class: {
            "sui-accordion-item-content": true
          },
          ref: "item-content",
          refInFor: true
        },
        [contentSlots[i]]
      );
      return h(
        "div",
        {
          class: {
            "sui-accordion-item": true,
            active: this.activeIndexes[i]
          },
          ref: "item",
          refInFor: true
        },
        [header, content]
      );
    });
    return h(
      "div",
      {
        class: "sui-accordion"
      },
      wrappedSlots
    );
  }
};
</script>

<style>
.sui-accordion-item-content {
  transition: all 0.5s;
}
</style>
