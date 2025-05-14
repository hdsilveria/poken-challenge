export interface RequestData<t> {
    data: t[]
    count: number
    page: number
    pageSize: number
    totalCount: number
}