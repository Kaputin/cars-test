export type PaginationPayload = {
  search?: string
  perPage: number
  page: number
}

export type VechiclesSuccessResponse = {
  data: {
    id: number
    userId: number
    companyId: number
    anglesCount: number
    vin: string
    vinPostfix: null | string
    vehicleName: string
    brand: null | string
    model: null | string
    bodyType: null | string
    fuelType: null | string
    hp: null | string
    ccm: null | string
    description: null | string
    moderated: boolean
    defectState: string
    placeholder: string
    preview: string
    photo: {
      id: number
      carId: number
      angleId: number
      url: string
      processedUrl: string
      status: number
      statusName: string
      defectState: string
      inProcessByAdmin: number
      createdAt: number
    }
    photosCount: number
    uploads: number
    createdAt: number
  }[]
  links: {
    first: string
    last: string
    prev: null | string
    next: null | string
  }
  meta: {
    currentPage: 1
    from: 1
    lastPage: 7
    links: {
      url: null | string
      label: string
      active: boolean
    }[]
    path: string
    perPage: string
    to: number
    total: number
  }
}
