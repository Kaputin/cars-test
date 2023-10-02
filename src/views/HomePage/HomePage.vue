<template>
  <div class="vechicles">
    <div class="vechicles__header">
      <div class="vechicles__header-wrapper">
        <div class="vechicles__header-form">
          <input
            v-model="count.search"
            :placeholder="t('vechicles.placeholder')"
            class="vechicles__header-input"
          />
          <SvgIcon icon="search" class="vechicles__header-search" />
        </div>
        <span class="vechicles__header-text">
          {{ t('vechicles.selectText') }}
        </span>
        <AppSelect
          v-model="count.current"
          :options="countList"
          :searchable="false"
          label="language"
          :clearable="false"
          class="vechicles__header-select"
        />
      </div>
      <button class="vechicles__header-button">
        <SvgIcon icon="plus" />
        <span>{{ t('vechicles.addButton') }}</span>
      </button>
    </div>
    <div v-if="vechiclesData" class="vechicles__list">
      <div
        v-for="item in vechiclesData.data"
        :key="item.id"
        class="vechicles__item"
      >
        <SvgIcon icon="dots" class="vechicles__item-dots" />
        <img
          :src="item.preview"
          :alt="item.vehicleName"
          class="vechicles__item-image"
        />
        <span class="vechicles__item-name">{{ item.vehicleName }}</span>
        <span class="vechicles__item-vin">{{ item.vin }}</span>
        <div class="vechicles__item-wrapper">
          <div
            :class="[
              'vechicles__item-angles',
              { '--check': item.anglesCount === anglesCount },
            ]"
          >
            <SvgIcon
              v-if="item.anglesCount === anglesCount"
              icon="check"
              class="vechicles__item-check"
            />
            <span>{{ item.anglesCount }}/{{ anglesCount }}</span>
          </div>
          <span class="vechicles__item-date">{{
            formatData(item.createdAt)
          }}</span>
        </div>
      </div>
    </div>
    <div v-if="vechiclesData" class="vechicles__pagination">
      <div class="vechicles__pagination-count">
        {{ t('vechicles.showing', vechiclesData.data.length) }}
        {{ vechiclesData.meta.total }}
      </div>
      <div class="vechicles__pagination-wrapper">
        <button
          @click="loadVechicles('minus')"
          :disabled="filterParams.page === 1 || isVechiclesLoading"
          class="vechicles__pagination-button"
        >
          <SvgIcon icon="chevron-left" class="vechicles__pagination-icon" />
        </button>
        <span class="vechicles__pagination-page">{{ filterParams.page }}</span>
        <span class="vechicles__pagination-text">{{ t('vechicles.of') }}</span>
        <span class="vechicles__pagination-page">{{
          vechiclesData.meta.lastPage
        }}</span>
        <button
          @click="loadVechicles('plus')"
          :disabled="
            filterParams.page === vechiclesData.meta.lastPage ||
            isVechiclesLoading
          "
          class="vechicles__pagination-button"
        >
          <SvgIcon icon="chevron-left" class="vechicles__pagination-icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./HomePage.ts"></script>
<style lang="scss" scoped src="./HomePage.scss"></style>
