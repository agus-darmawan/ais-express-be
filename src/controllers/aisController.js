import { saveVesselData } from "../services/aisService.js";
import {
  getAisFields,
  getVesselByMmsi,
} from "../repositories/aisRepository.js";
import { apiResponse } from "../utils/apiResponse.js";

export const handleAisData = async (props) => {
  const { message, timestamp } = props;
  const { data } = message;

  if (message.data.valid) {
    const vesselData = {
      mmsi: data.mmsi,
      channel: data.channel,
      aistype: data.aistype,
      repeat: data.repeat,
      immsi: data.immsi,
      class: data.class,
      navstatus: data.navstatus,
      lon: data.lon,
      lat: data.lat,
      rot: data.rot,
      sog: data.sog,
      cog: data.cog,
      hdg: data.hdg,
      utc: data.utc,
      smi: data.smi,
      timestamp: timestamp,
    };
    return await saveVesselData(vesselData);
  }
};

export const getAllAisData = async (req, res) => {
  try {
    const aisData = await getAisFields();
    apiResponse(res, 200, "Successfully fetched AIS data", aisData);
  } catch (error) {
    apiResponse(res, 500, "Error fetching AIS data", error.message);
  }
};

export const getAisDataByImmsi = async (req, res) => {
  const { mmsi } = req.params;
  try {
    const aisData = await getVesselByMmsi(mmsi);
    if (aisData) {
      const vesselData = await Vessel.findOne({ mmsi: mmsi }).populate("mmsi");
      apiResponse(res, 200, "Successfully fetched AIS data by MMSI", {
        aisData,
        vesselData,
      });
    } else {
      apiResponse(res, 404, "AIS data not found for the provided MMSI");
    }
  } catch (error) {
    apiResponse(res, 500, "Error fetching AIS data", error.message);
  }
};
