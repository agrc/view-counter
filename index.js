const { Datastore } = require("@google-cloud/datastore");

const VIEW_KIND = "view";
const BAD_REQUEST = 400;
const SERVER_ERROR = 500;

const datastore = new Datastore();

exports.viewcounter = async (request, response) => {
  // CORS headers
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "GET");

  const referrer = request.get("referrer");
  console.log("referrer", referrer);

  if (!referrer) {
    response.status(BAD_REQUEST).json({
      message: "referrer is undefined!",
    });
  }

  if (referrer.indexOf("deploy-preview") > -1) {
    return response.json({ preview: true });
  }
  if (referrer.indexOf("gis.utah.gov") === -1) {
    return response.json({ skip: true });
  }

  const key = datastore.key([VIEW_KIND, referrer]);
  const [entity] = await datastore.get(key);
  console.log(entity);

  if (!entity) {
    const data = { count: 1 };
    try {
      await datastore.save({
        key,
        data,
      });
    } catch (error) {
      return response.status(SERVER_ERROR).json({
        message: "error creating record",
        error: error || "",
      });
    }

    console.log("record created successfully");

    response.json({ count: entity.count });
  }

  console.log(entity.count);
  entity.count++;
  console.log(entity.count);

  try {
    await datastore.save({
      key,
      data: { count: entity.count },
    });
  } catch (error) {
    return response.status(SERVER_ERROR).json({
      message: "error updating record",
      error: error || "",
    });
  }

  console.log("record updated successfully");

  return response.json({ count: entity.count });
};
