import React from "react";
import { Modal, Box, Button, Stack, VStack } from "native-base";
import { BodyLarge, capture, H1, Layout, Widget } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import manifest from "../manifest.json";
import moment from "moment";

const PRESENT = "Present";
const ABSENT = "Absent";
const UNMARKED = "Unmarked";

function Home({ footerLinks, appName, setAlert }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = React.useState(false);
  const [popupModal, setPopupModal] = React.useState(false);
  let newAvatar = localStorage.getItem("firstName");

  let cameraUrl = "";
  let avatarUrlObject = cameraUrl
    ? {
        source: {
          uri: cameraUrl,
        },
      }
    : {};

  const widgetData = [
    {
      title: t("QUICK_CHECK"),
      data: [
        {
          title: "Learn",
          subTitle: "Sub title learn",
          _box: {
            style: {
              background:
                "linear-gradient(281.03deg, #6461d2 -21.15%, #8583f7 100.04%)",
            },
          },
        },
      ],
    },
  ];

  React.useEffect(() => {
    capture("PAGE");
    if (!localStorage.getItem("howToMarkAttendance")) {
      setPopupModal(true);
      localStorage.setItem("howToMarkAttendance", "true");
    }
  }, []);

  return (
    <Layout
      _header={{
        title: t("HOME"),
        subHeading: moment().format("hh:mm A"),
      }}
      _appBar={{
        languages: manifest.languages,
        isShowNotificationButton: true,
      }}
      subHeader={t("THIS_IS_HOW_YOUR_DAY_LOOKS")}
      _subHeader={{
        pt: "20px",
        pb: "20px",
      }}
      _footer={footerLinks}
    >
      <Box bg="white" roundedBottom={"2xl"} py={6} px={4} mb={5} shadow={3}>
        <Stack>
          <VStack space={6}>
            {widgetData.map((item, index) => {
              return <Widget {...item} key={index} />;
            })}
          </VStack>
        </Stack>
      </Box>
      <Modal
        safeAreaTop={true}
        isOpen={popupModal}
        onClose={() => setPopupModal(false)}
      >
        <Modal.Content
          maxWidth="1024px"
          position="fixed"
          bottom="0"
          w="92%"
          mb="69px"
        >
          <VStack space={5} p="5">
            <H1>{t("HOW_TO_MARK_OWN_ATTENDANCE")}</H1>
            <BodyLarge>{t("HOW_TO_MARK_OWN_ATTENDANCE_MESSAGE")}</BodyLarge>
            <Button.Group>
              <Button
                flex="1"
                variant="outline"
                fontSize="12px"
                fontWeight="600"
                colorScheme="button"
                _text={{ textTransform: "capitalize" }}
                onPress={(e) => setPopupModal(false)}
              >
                {t("SKIP")}
              </Button>
              <Button
                flex="1"
                fontSize="12px"
                fontWeight="600"
                colorScheme="button"
                _text={{ color: "white", textTransform: "capitalize" }}
                onPress={(e) => {
                  setShowModal(true);
                  setPopupModal(false);
                }}
              >
                {t("NEXT")}
              </Button>
            </Button.Group>
          </VStack>
        </Modal.Content>
      </Modal>
    </Layout>
  );
}
export default Home;
