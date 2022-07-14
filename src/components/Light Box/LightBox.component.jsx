import React, { useState, useEffect } from "react";
import { SRLWrapper } from "simple-react-lightbox";
import SimpleReactLightbox from "simple-react-lightbox";
import Image from "material-ui-image";

const LightBoxComponent = (props) => {
  return (
    <SimpleReactLightbox>
      <SRLWrapper>
        <a href={props?.url}>
          <Image
            src={props?.url}
            style={{ objectFit: "contain" }}
            alt={props?.title}
          />
        </a>
      </SRLWrapper>
    </SimpleReactLightbox>
  );
};

export default LightBoxComponent;
