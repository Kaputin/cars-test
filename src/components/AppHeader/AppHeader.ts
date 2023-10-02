import { defineComponent, computed, ref, watch, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMainStore } from '@/store/main'
import { setStorageItemWithExpiry } from '@/helpers/localStorageHelpers'
import { Locale } from '@/types/locale'
import mainMenu from '@/config/mainMenuLinks'
import { useRoute } from 'vue-router'
import AppSelect from '@/components/AppSelect/AppSelect.vue'

export default defineComponent({
  name: 'AppHeader',
  components: {
    AppSelect,
  },
  setup() {
    const { t, locale } = useI18n()
    const mainStore = useMainStore()
    const activeLocale = computed(() => locale.value)
    const menuLinks = computed(() => mainMenu)
    const pageTitle = ref('')
    const route = useRoute()
    const lang = reactive({
      current: mainStore.appLocale,
    })
    const langList = ['en', 'ru']
    const isVechiclesPage = computed(() => route.name === 'vechicles')
    const changeLocale = (localeToSet: Locale) => {
      locale.value = localeToSet
      const HTML = document.querySelector('html')
      HTML?.setAttribute('lang', localeToSet)
      setStorageItemWithExpiry('locale', localeToSet)
      mainStore.$patch({
        appLocale: localeToSet,
      })
    }

    watch(
      () => route.meta,
      () => {
        if (route.meta.tKey) {
          pageTitle.value = route.meta.tKey
        }
      },
    )

    watch(
      () => lang.current,
      () => {
        locale.value = lang.current
        const HTML = document.querySelector('html')
        HTML?.setAttribute('lang', lang.current)
        setStorageItemWithExpiry('locale', lang.current)
        mainStore.$patch({
          appLocale: lang.current,
        })
      },
    )

    return {
      t,
      activeLocale,
      mainStore,
      menuLinks,
      changeLocale,
      pageTitle,
      lang,
      langList,
      isVechiclesPage,
    }
  },
})
