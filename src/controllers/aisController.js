import { calculateFpCii } from "../services/fpCiiService.js";
import FCii from "../models/fcii.model.js";
import Ais from "../models/ais.model.js";
import moment from "moment";
import { apiResponse } from "../utils/apiResponse.js";
import { saveCiiData } from "../repositories/fpCiiRepository.js";

const getVesselByMmsi = async (mmsi) => {
  return await Ais.findOne({ mmsi });
};

const saveVesselData = async (data) => {
  const existingVessel = await getVesselByMmsi(data.mmsi);

  if (existingVessel) {
    const lastPosition =
      existingVessel.positions[existingVessel.positions.length - 1];
    const newPosition = data.positions[0];

    if (
      lastPosition.lat !== newPosition.lat ||
      lastPosition.lon !== newPosition.lon
    ) {
      const updatedVessel = await Ais.findOneAndUpdate(
        { mmsi: data.mmsi },
        {
          $push: { positions: newPosition },
          timestamp: Date.now(),
        },
        { new: true }
      );

      const ciiData = await calculateFpCii(data.mmsi);

      try {
        await FCii.deleteMany({
          mmsi: data.mmsi,
          timestamp: { $lt: moment().subtract(24, "hours").toDate() },
        });

        await saveCiiData({
          mmsi: data.mmsi,
          ciiData,
          timestamp: Date.now(),
        });
      } catch (error) {
        console.error("Error saving CII data:", error.message);
      }

      return updatedVessel;
    } else {
      console.log(
        "Posisi tidak berubah, tidak ada data baru yang ditambahkan."
      );
      return existingVessel;
    }
  } else {
    const newVessel = new Ais(data);
    const savedVessel = await newVessel.save();

    const ciiData = await calculateFpCii(data.mmsi);
    console.log("CII Data:", ciiData);
    try {
      await FCii.deleteMany({
        mmsi: data.mmsi,
        timestamp: { $lt: moment().subtract(24, "hours").toDate() },
      });

      await saveCiiData({
        mmsi: data.mmsi,
        ciiData,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error("Error saving CII data:", error.message);
    }

    return savedVessel;
  }
};

export const handleAisData = async (props) => {
  const { message, timestamp } = props;
  const { data } = message;

  try {
    if (!data || !data.mmsi || !data.lat || !data.lon) {
      return;
    }
    if (message?.data?.valid) {
      if (data.mmsi === "525010323") {
        data.mmsi = "525005223";
      }
      const vesselData = {
        mmsi: data.mmsi,
        channel: data.channel,
        aistype: data.aistype,
        immsi: data.immsi,
        class: data.class,
        navstatus: data.navstatus,
        smi: data.smi,
        timestamp: timestamp,
        positions: [
          {
            lat: data.lat,
            lon: data.lon,
            rot: data.rot,
            sog: data.sog,
            cog: data.cog,
            hdg: data.hdg,
            utc: data.utc,
            timestamp: timestamp,
          },
        ],
      };

      return await saveVesselData(vesselData);
    }
  } catch (error) {
    console.error("Error handling AIS data:", error.message);
  }
};

export const getAllAisData = async (req, res) => {
  try {
    const aisData = await Ais.aggregate([
      {
        $project: {
          mmsi: 1,
          channel: 1,
          aistype: 1,
          immsi: 1,
          class: 1,
          navstatus: 1,
          smi: 1,
          timestamp: 1,
          positions: { $slice: ["$positions", -1] },
        },
      },
    ]);

    apiResponse(
      res,
      200,
      "Successfully fetched AIS data with last position",
      aisData
    );
  } catch (error) {
    apiResponse(res, 500, "Error fetching AIS data", error.message);
  }
};

export const getAisDataByMmsi = async (req, res) => {
  const { mmsi } = req.params;

  try {
    const aisData = await Ais.findOne({ mmsi });

    if (aisData) {
      apiResponse(res, 200, "Successfully fetched AIS data by MMSI", aisData);
    } else {
      apiResponse(res, 404, "AIS data not found for the provided MMSI");
    }
  } catch (error) {
    apiResponse(res, 500, "Error fetching AIS data", error.message);
  }
};

export const getMmsiListByQuery = async (req, res) => {
  const { query } = req.query;
  try {
    const aisData = await Ais.find({
      mmsi: { $regex: query, $options: "i" },
    }).select("mmsi");

    if (aisData.length > 0) {
      const mmsiList = aisData.map((ais) => ais.mmsi);
      apiResponse(res, 200, "Successfully fetched MMSI list", { mmsiList });
    } else {
      apiResponse(res, 404, "No MMSIs found for the given query", {
        mmsiList: [],
      });
    }
  } catch (error) {
    apiResponse(res, 500, "Error fetching MMSI list", error.message);
  }
};
