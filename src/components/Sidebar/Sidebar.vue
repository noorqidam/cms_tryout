<template>
  <div class="sidebar">
    <SidebarHeader />
    <SidebarForm />
    <nav class="sidebar-nav">
      <div slot="header" />
      <ul id="result" class="nav">
        <template v-for="item in navItems">
          <template v-if="item.title">
            <SidebarNavTitle
              :key="item.name"
              :name="item.name"
              :classes="item.class"
              :wrapper="item.wrapper"
            />
          </template>
          <template v-else-if="item.divider">
            <SidebarNavDivider :key="item.class" :classes="item.class" />
          </template>
          <template v-else-if="item.label">
            <SidebarNavLabel
              :key="item.class"
              :name="item.name"
              :url="item.url"
              :icon="item.icon"
              :label="item.label"
              :classes="item.class"
            />
          </template>
          <template v-else>
            <template v-if="item.children">
              <!-- First level dropdown -->
              <SidebarNavDropdown :key="item.name" :name="item.name" :url="item.url" :icon="item.icon">
                <template v-for="childL1 in item.children">
                  <template v-if="childL1.children">
                    <!-- Second level dropdown -->
                    <SidebarNavDropdown
                      :key="childL1.name"
                      :name="childL1.name"
                      :url="childL1.url"
                      :icon="childL1.icon"
                    >
                      <li v-for="childL2 in childL1.children" :key="childL2" class="nav-item">
                        <SidebarNavLink
                          :name="childL2.name"
                          :url="childL2.url"
                          :icon="childL2.icon"
                          :badge="childL2.badge"
                          :variant="item.variant"
                        />
                      </li>
                    </SidebarNavDropdown>
                  </template>
                  <template v-else>
                    <SidebarNavItem :classes="item.class" :key="item.class">
                      <SidebarNavLink
                        :key="childL1.name"
                        :name="childL1.name"
                        :url="childL1.url"
                        :icon="childL1.icon"
                        :badge="childL1.badge"
                        :variant="item.variant"
                      />
                    </SidebarNavItem>
                  </template>
                </template>
              </SidebarNavDropdown>
            </template>
            <template v-else>
              <SidebarNavItem :classes="item.class" :key="item.class">
                <SidebarNavLink
                  :name="item.name"
                  :url="item.url"
                  :icon="item.icon"
                  :badge="item.badge"
                  :variant="item.variant"
                />
              </SidebarNavItem>
            </template>
          </template>
        </template>
        <template>
          <div class="col-md-12 text-center mt-3 mb-3">
            <div class="row">
              <div class="col-md-12 mb-1">Font Size</div>
              <div class="col-md-6">
                <button class="btn btn-secondary" @click="handleFontSmall">
                  <i class="fa fa-minus"></i>
                </button>
              </div>
              <div class="col-md-6">
                <button class="btn btn-secondary" @click="handleFontBig">
                  <i class="fa fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </template>
      </ul>
      <slot />
    </nav>
    <SidebarFooter />
    <SidebarMinimizer />
  </div>
</template>
<script>
import SidebarFooter from "./SidebarFooter";
import SidebarForm from "./SidebarForm";
import SidebarHeader from "./SidebarHeader";
import SidebarMinimizer from "./SidebarMinimizer";
import SidebarNavDivider from "./SidebarNavDivider";
import SidebarNavDropdown from "./SidebarNavDropdown";
import SidebarNavLink from "./SidebarNavLink";
import SidebarNavTitle from "./SidebarNavTitle";
import SidebarNavItem from "./SidebarNavItem";
import SidebarNavLabel from "./SidebarNavLabel";

export default {
  name: "Sidebars",
  components: {
    SidebarFooter,
    SidebarForm,
    SidebarHeader,
    SidebarMinimizer,
    SidebarNavDivider,
    SidebarNavDropdown,
    SidebarNavLink,
    SidebarNavTitle,
    SidebarNavItem,
    SidebarNavLabel
  },
  props: {
    navItems: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    handleClick(e) {
      e.preventDefault();
      e.target.parentElement.classList.toggle("open");
    },
    handleFontSmall() {
      let result = document.getElementById("result");
      let style = window.getComputedStyle(result, null).getPropertyValue("font-size");
      let fontSize = parseFloat(style);
      result.style.fontSize = fontSize - 1 + "px";
    },
    handleFontBig() {
      let result = document.getElementById("result");
      let style = window.getComputedStyle(result, null).getPropertyValue("font-size");
      let fontSize = parseFloat(style);
      result.style.fontSize = fontSize + 1 + "px";
    }
  }
};
</script>

<style lang="css" scope>
.nav-link {
  cursor: pointer;
}
/* .sidebar {
  font-family: monospace, "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
} */
</style>
