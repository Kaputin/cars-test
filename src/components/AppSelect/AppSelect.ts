import { defineComponent, h } from 'vue'
import vSelect from 'vue-select'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'AppSelect',
  components: {
    vSelect,
  },
  setup() {
    const { t } = useI18n()
    const OpenIndicator = () => h(SvgIcon, { icon: 'chevron-down' })
    return { t, OpenIndicator }
  },
})
