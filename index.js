const { Datastore } = require("@google-cloud/datastore");

const VIEW_KIND = "view";
const BAD_REQUEST = 400;
const SERVER_ERROR = 500;

const datastore = new Datastore();

exports.viewcounter = async (request, response) => {
  // CORS headers
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "GET");

  const href = request.body;

  return response.json({ blah: 'blah' });

  // empty request sends an empty object as the body
  if (!href || typeof href === 'object' || href.length === 0) {
    return response.status(BAD_REQUEST).json({
      message: "href post body data is missing!",
    });
  }

  if (href.indexOf("deploy-preview") > -1) {
    return response.json({ preview: true });
  }
  if (href.indexOf("gis.utah.gov") === -1 && process.env.NODE_ENV === "production") {
    return response.json({ skip: true, NODE_ENV: `${process.env.NODE_ENV}` });
  }

  const key = datastore.key([VIEW_KIND, href]);
  const [entity] = await datastore.get(key);

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

    return response.json({ count: entity.count });
  }

  entity.count++;

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
