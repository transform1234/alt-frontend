import React from "react";
import styles from "./StudentPage.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import CSVImportForm from "components/StudentCSV";
import listView from "components/StudentListView";
import { H4, Heading, BodyLarge } from "@shiksha/common-lib";
import { Layout, NameTag } from "@shiksha/common-lib";
import { Box, Stack, VStack, HStack, Avatar, Image, Button } from "native-base";
import { useTranslation } from "react-i18next";
import moment from "moment";
import manifest from "../../src/manifest.json";
import { useState } from "react";
import CSVModal from "react-modal";
import FORMmodal from "react-modal";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import StudentListView from "components/StudentListView";
import StudentForm from "components/StudentForm";
import CloseIcon from "@mui/icons-material/Close";

function StudentPage() {
  const [loading, setLoading] = React.useState(false);
  const [isCSVOpen, setIsCSVOpen] = useState(false);
  const [isFORMOpen, setIsFORMOpen] = useState(false);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const openCSVModal = () => {
    setIsCSVOpen(true);
  };
  const openFORMModal = () => {
    setIsFORMOpen(true);
  };
  const closeCSVModal = () => {
    setIsCSVOpen(false);
  };
  const closeFORMModal = () => {
    setIsFORMOpen(false);
  };

  return (
    <div className={styles.mainDiv}>
      <Layout
        loading={loading}
        _header={{
          title: t("STUDENT PAGE"),
          subHeading: moment().format("hh:mm:ss A"),
        }}
        _appBar={{
          languages: manifest.languages,
          isLanguageIcon: true,
          isShowNotificationButton: false,
          titleComponent: <NameTag />,
          _text_logo: <HStack></HStack>,
          LeftIcon: (
            <HStack>
              <img
                width={"100px"}
                src={require("./../assets/images/TSHeader.png")}
              />
            </HStack>
          ),
        }}
        _footer={{
          menues: [
            {
              title: "HOME",
              icon: "Home4LineIcon",
              route: "/",
            },
            {
              title: "STUDENT",
              icon: "TeamLineIcon",
              route: "/studentpage",
            },
            {
              title: "SCHOOL",
              icon: "GovernmentLineIcon",
              route: "/schoolpage",
            },

            {
              title: "TEACHER",
              icon: "UserLineIcon",
              route: "/teacherpage",
            },
          ],
        }}
      >
        <Box bg="white" rounded={"2x1"} py={6} px={4} mb={5} shadow={3}>
          <Stack>
            <VStack space={4}>
              <Box>
                <H4>Upload data using a custom form</H4>{" "}
                <Button onPress={openFORMModal}>FORM</Button>{" "}
                <H4>Import data using with a CSV File</H4>{" "}
                <Button onPress={openCSVModal}>CSV</Button>{" "}
              </Box>
              <Heading>Student Records list</Heading>
              {isCSVOpen && (
                <CSVModal
                  isOpen={isCSVOpen}
                  onRequestClose={closeCSVModal}
                  contentLabel="Edit Modal"
                  ariaHideApp={false}
                >
                  <div className={styles.bodyDiv}>
                    <CSVImportForm />
                  </div>
                </CSVModal>
              )}
              {isFORMOpen && (
                <FORMmodal
                  isOpen={isFORMOpen}
                  onRequestClose={closeFORMModal}
                  contentLabel="Edit Modal"
                  ariaHideApp={false}
                >
                  <button
                    onClick={closeFORMModal}
                    className={styles.closeButton}
                  >
                    <CloseIcon />
                  </button>
                  <div className={styles.bodyDiv}>
                    <StudentForm />
                  </div>
                </FORMmodal>
              )}
              <StudentListView />
            </VStack>
          </Stack>
        </Box>
      </Layout>
    </div>
  );
}

export default StudentPage;
