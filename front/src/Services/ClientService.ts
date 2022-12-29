import BaseService from './Common/BaseService'

class ClientService extends BaseService {
  getClients() {
    const url = '/clients'
    return this.get(url)
  }

  getClient(id: string) {
    const url = `/clients/${id}`
    return this.get(url)
  }

  saveClient(data: any) {
    const url = '/clients'
    return this.post(url, data)
  }

  updateClient(id: string, data: any) {
    const url = `/clients/${id}`
    return this.put(url, data)
  }

  deleteClient(ids: string[]) {
    const url = '/clients/delete'
    return this.post(url, ids)
  }

  searchClients(query: string) {
    const url = `/clients/search/${query}`
    return this.get(url)
  }
}

export default new ClientService()
