import React from 'react';
import { Interweave } from 'interweave';
import * as getprivacy from '~/services/getPrivacy';
import { useEffect } from 'react';
import { useState } from 'react';


const Privacy = () => {
  const [privacy, setPrivacy] = useState();
  useEffect(() => {
    const fetch = async () => {
      const res = await getprivacy.getprivacy();
      setPrivacy(...res.data);
    };
    fetch();
  }, []);
 
  return <div>{privacy !== undefined && <Interweave content={privacy.content} />}</div>;
};

export default Privacy;
