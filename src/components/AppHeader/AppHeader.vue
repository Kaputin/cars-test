<template>
  <header class="header">
    <div class="header__left">
      <span class="header__left-title">Demo Test</span>
      <div class="header__left-navigation">
        <router-link
          v-for="link in menuLinks"
          :key="link.name"
          :to="{ name: link.name }"
          custom
          v-slot="{ navigate, isActive }"
        >
          <div
            @click="navigate"
            :class="['header__left-link', { active: isActive }]"
          >
            <SvgIcon :icon="link.name" />
            <span>{{ t(link.tKey) }}</span>
          </div>
        </router-link>
      </div>
    </div>
    <div class="header__top">
      <div class="header__top-wrapper">
        <span v-if="pageTitle" class="header__top-title">{{
          t(pageTitle)
        }}</span>
        <span
          v-if="
            mainStore.vechiclesCount && isVechiclesPage && !mainStore.isMobile
          "
          class="header__top-count"
          >{{ mainStore.vechiclesCount }}</span
        >
      </div>
      <div class="header__top-wrapper">
        <button v-if="!mainStore.isMobile" class="header__top-plus">
          <SvgIcon icon="plus" />
        </button>
        <router-link :to="{ name: 'profile' }" class="header__top-profile">
          <img
            src="@/assets/img/avatar.png"
            alt="avatar"
            class="header__top-avatar"
          />
          <span v-if="!mainStore.isMobile" class="header__top-name"
            >John Doe</span
          >
        </router-link>
        <div class="header__top-language">
          <SvgIcon :icon="mainStore.appLocale" class="header__top-icon" />
          <AppSelect
            v-model="lang.current"
            :options="langList"
            :searchable="false"
            label="language"
            :clearable="false"
            class="schedule__sort-field"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" src="./AppHeader.ts"></script>
<style lang="scss" scoped src="./AppHeader.scss"></style>
