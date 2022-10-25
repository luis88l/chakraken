import { Grid, GridItem } from "@chakra-ui/react";
import KBadge from "../../components/badge/KBadge";
import KButton from "../../components/button/KButton";
import KCheckbox from "../../components/checkbox/KCheckbox";
import KClosebutton from "../../components/closebutton/KClosebutton";
import KDrawer from "../../components/drawer/KDrawer";
import KEditable from "../../components/editable/KEditable";
import KFormControl from "../../components/formcontrol/KFormControl";
import KHeading from "../../components/heading/KHeading";
import KHidden from "../../components/hidden/KHidden";
import KHighlight from "../../components/highlight/KHighlight";
import KIcon from "../../components/icon/KIcon";
import KImage from "../../components/image/KImage";
import KInput from "../../components/input/KInput";
import KKboardkey from "../../components/keyboardkey/KKboardkey";
import KLink from "../../components/link/KLink";
import KLinkoverlay from "../../components/linkoverlay/KLinkoverlay";
import KMenu from "../../components/menu/KMenu";
import KModal from "../../components/modal/KModal";
import KNumberinput from "../../components/numberinput/KNumberinput";
import KPininput from "../../components/pininput/KPininput";
import KPopOver from "../../components/popover/KPopOver";
import KPortal from "../../components/portal/KPortal";
import KProgress from "../../components/progress/KProgress";
import KProgressBar from "../../components/progressbar/KProgressBar";
import KRangeslider from "../../components/rangeslider/KRangeslider";
import { KAccordion, KAlert, KAvatar } from "../../components/react";
import KShowhide from "../../components/showhide/KShowhide";
import KSkeleton from "../../components/skeleton/KSkeleton";
import KSlider from "../../components/slider/KSlider";
import KSpinner from "../../components/spinner/KSpinner";
import KStat from "../../components/stat/KStat";
import KSwitch from "../../components/switch/KSwitch";
import KTab from "../../components/tab/KTab";
import KTable from "../../components/table/KTable";
import KTag from "../../components/tag/KTag";
import KText from "../../components/text/KText";
import KTextarea from "../../components/textarea/KTextarea";
import KToast from "../../components/toast/KToast";
import KToolTip from "../../components/tooltip/KToolTip";
import KTranstions from "../../components/transitions/KTransitions";

export default function emicomponents() {
  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
      gridTemplateRows={"50px 1fr 520px"}
      gridTemplateColumns={"160px 1fr"}
      h="100px"
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem pl="0" bg="purple.300" area={"footer"}>
        <KAccordion
          flex={undefined}
          textAlign={undefined}
          titleBox1={"Emi Accordion"}
          pb={0}
          contentPanel1={"This a example"}
          titleBox2={"Emi Accordion"}
          contentPanel2={"Hii!!"}
        ></KAccordion>
        <KInput
          pr={"4.5rem"}
          placeholder={"text here.."}
          width={"4.5rem"}
          size={"md"}
          h={"1.75rem"}
        ></KInput>
        <KKboardkey funcion={"Ctrl"} funcion2={"H"}></KKboardkey>
        <KLink
          href={"https://chakra-ui.com"}
          text={"Chakra Design system"}
          mx={"2px"}
        ></KLink>
        <KLinkoverlay
          maxW={"sm"}
          p={5}
          borderWidth={1}
          rounded={"md"}
          size={"md"}
          my={2}
          href={"#"}
          text={"New Year, New Beginnings: Smashing Workshops & Audits"}
          text2={"Catch up on whats been cookin"}
          dateTime={"2021-01-15 15:30:00 +0000 UTC"}
        ></KLinkoverlay>
        <KMenu items={[]} titleMenu={"Home"}></KMenu>
        <br></br>
        <br></br>
        <KModal
          BtnTitle={"Boton"}
          ModalHeaderTitle={"Emi"}
          ModalBodyTitle={"contenido"}
          TxtBtnClose={"close"}
          TxtBtnSave={"save"}
          variant={"ghost"}
        ></KModal>
        <KNumberinput></KNumberinput>
      </GridItem>

      <GridItem pl="2" bg="purple.200" area={"nav"}>
        <KAlert status={"loading"} title={"This is a Alert"}></KAlert>
        <KButton
          direction={undefined}
          align={"right"}
          colorScheme={"red"}
          size={"md"}
          title={"Boton"}
        ></KButton>
        <KCheckbox
          direction={undefined}
          title={"Checkbox"}
          colorScheme={"green"}
          spacing={0}
        ></KCheckbox>
        <KClosebutton direction={undefined} size={"lg"}></KClosebutton>
        <KDrawer
          size={"md"}
          placement={undefined}
          title={"Boton"}
          placeholder={"text here..."}
          variant={"ghost"}
          mr={5}
          titleBtnDrawer={"Boton"}
          titleBtnCancel={"Cancel"}
          titleBtnSave={"Save"}
        ></KDrawer>
        <KEditable defaultValue={"Text Here..."}></KEditable>
        <KFormControl
          formtitle={"This is a Form control"}
          placeholder={"select country"}
          option={"Mexico"}
          option2={"Argentina"}
        ></KFormControl>
        <KHeading text={"Heading"}></KHeading>
        <KHidden></KHidden> <br></br>
        <KHighlight></KHighlight>
        <KIcon w={10} h={10}></KIcon>
        <KImage
          boxSize={100}
          objectFit={undefined}
          src={"https://bit.ly/dan-abramov"}
          alt={"Emiliano"}
        ></KImage>
        <KTextarea placeholder={"Text area..."}></KTextarea>
        <KToast></KToast>
        <br></br> <br></br>
        <KToolTip
          label={"search places"}
          title={"boton"}
        ></KToolTip> <br></br> <br></br>
        <KTranstions
          buttontext={"Boton"}
          p={10}
          mt={10}
          rounded={10}
          shadow={"100"}
          content={"text here"}
        ></KTranstions>
        <KPininput></KPininput>
        <KPopOver></KPopOver>
        <KPortal text={"Emi"} portal={"Hola"}></KPortal>
        <KProgress max={10} min={10} content={10}></KProgress>
      </GridItem>

      <GridItem pl="2" bg="purple.200" area={"main"}>
        <KAvatar size={"lg"} name={"Rios"} src={""}></KAvatar>
        <KProgressBar size={"md"} value={100}></KProgressBar>
        <KRangeslider></KRangeslider>
        <KShowhide></KShowhide>
        <KSkeleton height={10} width={"100"}></KSkeleton>
        <KSlider defaultValue={1}></KSlider>
        <KSpinner size={"lg"}></KSpinner>
        <KStat
          title={"Acciones"}
          Number={1000.295}
          percentage={"35.5"}
          type={undefined}
        ></KStat>
        <KSwitch
          display={undefined}
          alignItems={undefined}
          mb={"3"}
          text={"Switch"}
          id={undefined}
          htmlFor={undefined}
        ></KSwitch>
        <KTab
          title={"Tab"}
          title2={"example"}
          content={"home"}
          content2={"hello"}
        ></KTab>
        <KTable
          Caption={"this is a example from the table"}
          Content={"example"}
          Description={"convertion"}
          Variant={""}
        ></KTable>
        <KTag size={"md"} variant={"solid"} boxSize={5} title={"tag"}></KTag>
        <KText fontSize={"20"} content={"text here..."}></KText>
      </GridItem>
      <GridItem pl="2" bg="purple.300" area={"header"}>
        <KBadge
          src={""}
          Ml={"3"}
          fontSize={"sm"}
          title={"Emi"}
          status={"nuevo"}
          description={"UI Engineer"}
          fontWeight={"thin"}
          colorScheme={"gray"}
        ></KBadge>
      </GridItem>
    </Grid>
  );
}
