import { defineComponent, onBeforeMount, reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import AppSelect from '@/components/AppSelect/AppSelect.vue'
import { PaginationPayload, VechiclesSuccessResponse } from '@/types/vechicles'
import { vechiclesApiCall } from '@/api/vechicles'
import { DefaultError } from '@/types/httpError'
import { useApiCall } from '@/composables/useApiCall'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import ru from 'dayjs/locale/ru'
import en from 'dayjs/locale/en'
import { useMainStore } from '@/store/main'

export default defineComponent({
  name: 'HomePage',
  components: {
    AppSelect,
  },
  setup() {
    const { t } = useI18n()
    const mainStore = useMainStore()
    const anglesCount = 30
    const count = reactive({
      current: 9,
      search: '',
    })
    const countList = [9, 12, 15, 18, 21, 24]
    const filterParams = reactive<PaginationPayload>({
      perPage: count.current,
      page: 1,
    })

    dayjs.extend(relativeTime)
    dayjs.extend(localizedFormat)

    const {
      isLoading: isVechiclesLoading,
      data: vechiclesData,
      error: vechiclesError,
      executeApiCall: getvVchicles,
    } = useApiCall<VechiclesSuccessResponse, DefaultError, PaginationPayload>(
      vechiclesApiCall,
      false,
      filterParams,
    )

    const formatData = (data: number) => {
      if (mainStore.appLocale === 'ru') {
        return dayjs(data * 1000)
          .locale(ru)
          .fromNow()
      } else {
        return dayjs(data * 1000)
          .locale(en)
          .fromNow()
      }
    }

    const loadVechicles = (page: string) => {
      switch (page) {
        case 'minus':
          filterParams.page--
          break
        default:
          filterParams.page++
          break
      }
    }

    watch(
      () => count.current,
      () => {
        filterParams.page = 1
        filterParams.perPage = count.current
      },
    )

    watch(
      () => count.search,
      () => {
        if (count.search as string) {
          filterParams.page = 1
          filterParams.perPage = count.current
          filterParams.search = count.search
        } else {
          delete filterParams.search
          filterParams.page = 1
          filterParams.perPage = count.current
        }
      },
    )

    onBeforeMount(async () => {
      await getvVchicles()
      if (vechiclesData.value) {
        mainStore.$patch({
          vechiclesCount: vechiclesData.value.meta.total,
        })
      }
    })

    return {
      t,
      count,
      countList,
      isVechiclesLoading,
      vechiclesData,
      vechiclesError,
      anglesCount,
      formatData,
      filterParams,
      loadVechicles,
    }
  },
})
