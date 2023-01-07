export interface Device {
  id: string;
  location?: string | null;
  model?: string | null;
  software?: string | null;
  device_id?: string | null;
  model_num: string;
  producer: string;
  year?: string | null;
}

export interface AvailableDevices {
  id: string;
  location?: string | null;
  model?: string | null;
  software?: string | null;
  device_id?: string | null;
  model_num: string;
  producer: string;
  year?: string | null;
}

export interface TakenDevices {
  id: string;
  location?: string | null;
  model?: string | null;
  software?: string | null;
  device_id?: string | null;
  model_num: string;
  producer: string;
  year?: string | null;
}
