import React from "react";
import styles from "./ProfileInfo.module.css";

const ProfileInfo = ({ backendData }) => {
  return (
    <div className={styles["playerContainer"]}>
      <div className={styles["playerIcon"]}>
        {backendData.avatar ? (
          <img height="100px" width="100px" src={backendData.avatar} />
        ) : (
          <img height="100px" width="100px" src="../../../assets/blank.svg" />
        )}
      </div>
      <div className={styles["playerName"]}>
        {backendData.title && (
          <div className={styles["playerTitle"]}>{backendData.title}</div>
        )}
        {backendData.username}
      </div>
    </div>
  );
};

export default ProfileInfo;
