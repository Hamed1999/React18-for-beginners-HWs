import apiClient from "./api-client";

interface Entity {
  id: number;
}

class HttpService {
  endPoint: string;

  constructor(endpoint: string) {
    this.endPoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endPoint, {signal: controller.signal});
    return {
      request,
      cancel: () => controller.abort()
    };
  }

  delete(id: number) {
    return apiClient.delete(this.endPoint + "/" + id);
  }

  create<T>(newEntity: T) {
    return apiClient.post<T>(this.endPoint, newEntity);
  }

  update<T extends Entity>(entity: T) {
    return apiClient.patch<T>(this.endPoint + "/" + entity.id, entity);
  }
}

const create = (endPoint: string) => new HttpService(endPoint);
export default create;