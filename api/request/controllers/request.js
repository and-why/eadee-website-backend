"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.request.create(data, { files });
    } else {
      entity = await strapi.services.request.create(ctx.request.body);
    }
    entity = sanitizeEntity(entity, { model: strapi.models.request });

    await strapi.plugins["email"].services.email.send({
      to: "contact@eadee.co",
      from: "admin@eadee.co",
      subject: "Eadee website contact form",
      text: `
        Contact request #${entity.id}
        
        Email: ${entity.email}
        
        Message: 
        ${entity.body}
      `,
    });
    return entity;
  },
};
