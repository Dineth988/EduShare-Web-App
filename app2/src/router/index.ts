import { createRouter, createWebHistory } from 'vue-router'

import Profile from '@/components/profile.vue'
import Requests from '@/components/requests.vue'
import Home from '@/components/home.vue'
import Donation from '@/components/donation.vue'
import MatchDonations from '@/components/matchDonations.vue'
import MoneyDonations from '@/components/moneyDonations.vue'
import ServiceDonation from '@/components/serviceDonation.vue'



import Login from '@/components/login.vue'
import ThankDonationPage from '@/components/thankDonationPage.vue'
import Register from '@/components/register.vue'
import Chat from '@/components/chat.vue'
import DasboardDilukshan from '@/components/dasboardDilukshan.vue'
import DilukshanResourceLibrary from '@/components/DilukshanResourceLibrary.vue'
import DilukshanNewRequest from '@/components/DilukshanNewRequest.vue'
import DilukshanPotentialMatch from '@/components/DilukshanPotentialMatch.vue'
import DilukshanHistoryPage from '@/components/DilukshanHistoryPage.vue'
import DilukshanProfilePage from '@/components/DilukshanProfilePage.vue'
import DilukshanDonationMatch from '@/components/DilukshanDonationMatch.vue'
import DilukshanNotificationPage from '@/components/DilukshanNotificationPage.vue'
import DilukshanRequestResource from '@/components/DilukshanRequestResource.vue'
import AwshadiAdminDash from '@/components/AwshadiAdminDash.vue'
import AwshadiResourceReview from '@/components/AwshadiResourceReview.vue'
import AwshadiUserManage from '@/components/AwshadiUserManage.vue'
import AwshadiAddUser from '@/components/AwshadiAddUser.vue'
import AwshadiChatMessage from '@/components/AwshadiChatMessage.vue'
import AwshadiMyDonation from '@/components/AwshadiMyDonation.vue'

import ReportImpact from '@/components/ReportImpact.vue'
import Upcoming from '@/components/Upcoming.vue'
import ScheduleDonation from '@/components/ScheduleDonation.vue'
import DenethiSubmitRequest from '@/components/DenethiSubmitRequest.vue'
import DenethiSubmittedSuccess from '@/components/DenethiSubmittedSuccess.vue'
import DenethiRequestStatus from '@/components/DenethiRequestStatus.vue'
import DenethiMatchingDonation from '@/components/DenethiMatchingDonation.vue'
import DenethiDonationFeedBack from '@/components/DenethiDonationFeedBack.vue'
import DenethiSupportFeedback from '@/components/DenethiSupportFeedback.vue'
import DenethiFeedbackSubmitted from '@/components/DenethiFeedbackSubmitted.vue'
import DenethiResourceUpdate from '@/components/DenethiResourceUpdate.vue'
import DenethiHome from '@/components/DenethiHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/requests',
      name: 'requests',
      component: Requests,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/donation',
      name: 'donation',
      component: Donation,
    },
    {
      path: '/matchDonations/:requestId',
      name: 'matchDonations',
      component: MatchDonations,
    },
    {
      path: '/moneyDonations',
      name: 'moneyDonations',
      component: MoneyDonations,
    },
    {
      path: '/serviceDonation',
      name: 'serviceDonation',
      component: ServiceDonation,
    },

    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/thankDonation/:donationId',
      name: 'thankDonation',
      component: ThankDonationPage,
      props: true,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      props: true,
    },
     {
      path: '/chat',
      name: 'chat',
      component: Chat,
      props: true,
    },
        {
      path: '/dashboard',
      name: 'dashboard',
      component: DasboardDilukshan,
      
    },


    {
      path: '/donations',
      name: 'MyDonations',
      component: AwshadiMyDonation,
    },
    {
      path: '/reports',
      name: 'report-impact',
      component: ReportImpact,
    },
    {
      path: '/upcoming',
      name: 'upcoming-donations',
      component: Upcoming,
    },
    {
      path: '/schedule-donation',
      name: 'schedule-donation',
      component: ScheduleDonation,
    },

    //Dilukshan
      { path: '/', name: 'Dashboard', component: DasboardDilukshan },
  {
    path: '/request-resource/:resource_id',
    name: 'ResourceReq',
    component: DilukshanRequestResource,
    props: true,
  },
  { path: '/resources', name: 'ResourceLib', component: DilukshanResourceLibrary },
  { path: '/newrequests', name: 'NewRequest', component: DilukshanNewRequest },
  { path: '/matches', name: 'PotentialMatches', component: DilukshanPotentialMatch },
  { path: '/history', name: 'ViewHistory', component: DilukshanHistoryPage },
  { path: '/ngoprofile', name: 'ViewProfile', component: DilukshanProfilePage },
  { path: '/donor-match/:id', name: 'DonorMatch', component: DilukshanDonationMatch, props: true },
  { path: '/notifications', name: 'NotificationPage', component: DilukshanNotificationPage },

  //Awshadi

   {
      path: '/AdminDashboard',
      name: 'AdminDashboard',
      component: AwshadiAdminDash,
    },

    {
      path: '/resource-review',
      name: 'ResourceReview',
      component: AwshadiResourceReview,
    },

    {
      path: '/user-management',
      name: 'UserManagement',
      component: AwshadiUserManage,
    },
    {
      path: '/add-user',
      name: 'AddUser',
      component: AwshadiAddUser,
    },
    {
      path: '/messages',
      name: 'Messages',
      component: AwshadiChatMessage, // Add this new route
    },
    {
      path: '/donations',
      name: 'MyDonation',
      component: AwshadiMyDonation,
    },


    //Denethi

    {
    path: '/recipientHome',
    name: 'Home',
    component: DenethiHome,
    meta: {
      title: 'EduShare - Home',
      requiresAuth: false,
    },
  },
  {
    path: '/submit-request',
    name: 'SubmitRequest',
    component: DenethiSubmitRequest,
    meta: {
      title: 'Submit New Request',
      requiresAuth: false,
    },
  },
  {
    path: '/submitted-successfully',
    name: 'SubmittedSuccessfully',
    component: DenethiSubmittedSuccess,
    meta: {
      title: 'Submission Successful',
      requiresAuth: false,
    },
    props: (route) => ({
      submissionType: route.query.type || 'request',
      reference: route.query.ref,
    }),
  },
  {
    path: '/request-status',
    name: 'RequestStatus',
    component: DenethiRequestStatus,
    meta: {
      title: 'Request Status',
      requiresAuth: false,
    },
  },
  {
    path: '/matching-donations',
    name: 'MatchingDonation',
    component: DenethiMatchingDonation,
    meta: {
      title: 'Matching Donations',
      requiresAuth: false,
    },
  },
  {
    path: '/donation-feedback',
    name: 'DonationFeedback',
    component: DenethiDonationFeedBack,
    meta: {
      title: 'Donation Feedback',
      requiresAuth: false,
    },
    props: (route) => ({
      donationId: route.query.donationId,
    }),
  },
  {
    path: '/support-feedback',
    name: 'SupportFeedback',
    component: DenethiSupportFeedback,
    meta: {
      title: 'Support & Feedback',
      requiresAuth: false,
    },
  },
  {
    path: '/feedback-submitted',
    name: 'FeedbackSubmitted',
    component: DenethiFeedbackSubmitted,
    meta: {
      title: 'Feedback Submitted Successfully',
      requiresAuth: false,
    },
  },
  {
    path: '/resource-update',
    name: 'ResourceUpdate',
    component: DenethiResourceUpdate,
    meta: {
      title: 'Resource Update',
      requiresAuth: false,
    },
  },
 
  ],
})

export default router
