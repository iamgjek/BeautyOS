import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// duotone
import { faAngleLeft as fadAngleLeft } from '@fortawesome/pro-duotone-svg-icons';
// light
import {
  faPen as falPen, faCalendarCheck as falCalendarCheck, faClock as falClock, faUsers as falUsers, faCircleEllipsis as falCircleEllipsis, faLocationDot, faBriefcase, faPersonWalking,
} from '@fortawesome/pro-light-svg-icons';
// regular
import {
  faShareNodes as farShareNodes, faUpload as farUpload, faArrowsRotate as farArrowsRofaArrowsRotate, faCircleCheck as farCircleCheck, faFloppyDisk as farFloppyDisk, faPencil as farPencil, faCircleInfo as farCircleInfo, faXmark as farXmark, faCircleXmark as farCircleXmark, faCircleP as farCircleP, faTicket as farTicket, faAngleLeft as farAngleLeft, faUser as farUser, faFilterList as farFilterList, faMagnifyingGlass as farMagnifyingGlass, faCalendarDays as farCalendarDays, faRightFromBracket as farRightFromBracket, faCirclePlus as farCirclePlus, faList as farList, faAngleUp as farAngleUp, faVolume,
} from '@fortawesome/pro-regular-svg-icons';
// solid
import {
  faUser as fasUser, faBan as fasBan, faClockRotateLeft as fasClockRotateLeft, faTriangle as fasTriangle, faChartMixed as fasChartMixed, faFileInvoiceDollar as fasFileInvoiceDollar, faList as fasList, faAngleLeft as fasAngleLeft, faAngleRight as fasAngleRight, faClockFive as fasClockFive, faEyeSlash as fasEyeSlash, faEye as fasEye, faTrashCan as fasTrashCan, faUpFromBracket, faDownToBracket, faGripDotsVertical, faBars, faAngleDown as fasAngleDown,
} from '@fortawesome/pro-solid-svg-icons';
// thin
import { faAngleLeft as fatAngleLeft, faPen, faFloppyDisk } from '@fortawesome/pro-thin-svg-icons';
// brands
import { faLine } from '@fortawesome/free-brands-svg-icons';

library.add(fasUser, farCircleCheck, farShareNodes, farUpload, farFloppyDisk, falPen, farPencil, farCircleInfo, farXmark, farCircleXmark, fasBan, farCircleP, fasClockRotateLeft, fasTriangle, farTicket, fasChartMixed, fasFileInvoiceDollar, fasList, fadAngleLeft, falCalendarCheck, falClock, farUser, falUsers, farFilterList, fasClockFive, farMagnifyingGlass, farCalendarDays, farAngleLeft, farRightFromBracket, fasAngleLeft, farCirclePlus, farList, fasEyeSlash, fasEye, fasAngleRight, fatAngleLeft, falCircleEllipsis, farAngleUp, farArrowsRofaArrowsRotate, faVolume, fasTrashCan, faUpFromBracket, faDownToBracket, faGripDotsVertical, faLine, faPen, faFloppyDisk, faBars, faLocationDot, faBriefcase, faPersonWalking, fasAngleDown);
Vue.component('font-awesome-icon', FontAwesomeIcon);
