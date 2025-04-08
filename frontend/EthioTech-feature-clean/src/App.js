/* eslint-disable import/no-extraneous-dependencies */
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
// import Welcome from './redux/auth/Welcome';
import Home from './components/home/Home';
import Layout from './components/layout/Layout';
import RequireAuth from './redux/auth/RequireAuth';
import Page from './pages/Page';
import About from './pages/About';
import Team from './pages/Team';
import Partner from './pages/Partner';
import Contact from './pages/Contact';
import Project from './pages/Project';
import Service from './pages/Service';
import Tranings from './pages/Tranings';
import Events from './components/event/Events';
import News from './pages/News';
import NewsPost from './components/news/NewsPost';
import Career from './components/career/Career';
import Job from './components/career/Job';
import Dashboard from './pages/Dashboard';
import AddAccount from './admin/users/AddAccount';
import Overview from './admin/Dashboard';
import AdminJobs from './admin/jobs/Jobs';
import AdminEvents from './admin/event/Events';
import AdminProjects from './admin/project/Projects';
import AdminServices from './admin/service/Services';
import AdminPartners from './admin/partner/Partners';
import AdminTrainings from './admin/training/Trainings';
import AdminContact from './admin/contact/contact';
import AdminNews from './admin/news/News';
import Profile from './admin/Profile';
import AddForm from './admin/users/AddForm';
import ServiceCreateForm from './admin/service/ServiceCreateForm';
import ServiceUpdateForm from './admin/service/ServiceUpdateForm';
import ServiceDetail from './admin/service/ServiceDetail';
import ProjectUpdateForm from './admin/project/ProjectUpdateForm';
import ProjectCreateForm from './admin/project/ProjectCreateForm';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';
import ProjectDetail from './admin/project/ProjectDetail';
import EventCreateForm from './admin/event/EventCreateForm';
import EventUpdateForm from './admin/event/EventUpdateForm';
import EventDetail from './admin/event/EventDetail';
import PartnerCreateForm from './admin/partner/PartnerCreateForm';
import PartnerUpdateForm from './admin/partner/PartnerUpdateForm';
import PartnerDetail from './admin/partner/PartnerDetail';
import TrainingCreateForm from './admin/training/TrainingCreateForm';
import TrainingUpdateForm from './admin/training/TrainingUpdateForm';
import TrainingDetail from './admin/training/TrainingDetail';
import NewsForm from './admin/news/NewsCreateForm';
import NewsUpdateForm from './admin/news/NewsUpdateForm';
import NewsDetail from './admin/news/NewsDetail';
import JobForm from './admin/jobs/JobForm';
import JobUpdateForm from './admin/jobs/JobUpdateForm';
import JobDetails from './admin/jobs/JobDetails';
import JopApplication from './admin/jobs/JopApplication';
import NotFoundPage from './components/Notfound';
import ContactUpdateForm from './admin/contact/contactUpdateForm';
import EventForm from './components/event/EventForm';
import TrainingForm from './components/traning/TraningForm';
import EventAttendee from './admin/event/EventAttendee';
import Trainees from './admin/training/Trainees';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* {public routes} */}
          <Route path="/" element={<Page />}>
            <Route path="/" element={<Home />} />
            <Route path="/aboutUs" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Project />} />
            <Route path="/services" element={<Service />} />
            <Route path="/event" element={<Events />} />
            <Route path="/trainings" element={<Tranings />} />
            <Route path="/news" element={<News />} />
            <Route path="/newspost/:slug" element={<NewsPost />} />
            <Route path="/career" element={<Career />} />
            <Route path="/job/:slug" element={<Job />} />
            <Route path="/attendEvent/:id" element={<EventForm />} />
            <Route path="/enroll/:id" element={<TrainingForm />} />

          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="reset-Password/:id/:token" element={<ResetPassword />} />
          <Route path="/admin/changePassword" element={<ChangePassword />} />
          <Route path="*" element={<NotFoundPage />} />

          {/* {protected routws} */}
          <Route element={<RequireAuth />}>
            <Route path="/admin" element={<Dashboard />}>
              <Route path="/admin" element={<Overview />} />
              <Route path="/admin/add" element={<AddAccount />} />
              <Route path="/admin/events" element={<AdminEvents />} />
              <Route path="/admin/jobs" element={<AdminJobs />} />
              <Route path="/admin/news" element={<AdminNews />} />
              <Route path="/admin/profile" element={<Profile />} />
              <Route path="/admin/projects" element={<AdminProjects />} />
              <Route path="/admin/services" element={<AdminServices />} />
              <Route path="/admin/partners" element={<AdminPartners />} />
              <Route path="/admin/trainings" element={<AdminTrainings />} />
              <Route path="/admin/contact" element={<AdminContact />} />
              <Route path="/admin/addUsers" element={<AddForm />} />
              <Route path="/admin/addService" element={<ServiceCreateForm />} />
              <Route path="/admin/addJob" element={<JobForm />} />
              <Route path="/admin/updateService/:id" element={<ServiceUpdateForm />} />
              <Route path="/admin/serviceDetail/:id" element={<ServiceDetail />} />
              <Route path="/admin/addProject" element={<ProjectCreateForm />} />
              <Route path="/admin/updateProject/:id" element={<ProjectUpdateForm />} />
              <Route path="/admin/ProjectDetail/:id" element={<ProjectDetail />} />
              <Route path="/admin/addEvent" element={<EventCreateForm />} />
              <Route path="/admin/updateEvent/:id" element={<EventUpdateForm />} />
              <Route path="/admin/EventDetail/:id" element={<EventDetail />} />
              <Route path="/admin/addPartner" element={<PartnerCreateForm />} />
              <Route path="/admin/updatePartner/:id" element={<PartnerUpdateForm />} />
              <Route path="/admin/PartnerDetail/:id" element={<PartnerDetail />} />
              <Route path="/admin/addTraining" element={<TrainingCreateForm />} />
              <Route path="/admin/updateTraining/:id" element={<TrainingUpdateForm />} />
              <Route path="/admin/TrainingDetail/:id" element={<TrainingDetail />} />
              <Route path="/admin/addNews" element={<NewsForm />} />
              <Route path="/admin/updateNews/:id" element={<NewsUpdateForm />} />
              <Route path="/admin/NewsDetail/:id" element={<NewsDetail />} />
              <Route path="/admin/updateJob/:id" element={<JobUpdateForm />} />
              <Route path="/admin/updateJob/:id" element={<JobUpdateForm />} />
              <Route path="/admin/jobs/:slug" element={<JobDetails />} />
              <Route path="/admin/jobApplicants/:id" element={<JopApplication />} />
              <Route path="/admin/updateContact" element={<ContactUpdateForm />} />
              <Route path="/admin/eventAttendee/:id" element={<EventAttendee />} />
              <Route path="/admin/trainee/:id" element={<Trainees />} />
            </Route>

            {/* <Route path="/welcome" element={<Welcome />} /> */}
          </Route>
        </Route>
      </Routes>

    </>
  );
}

export default App;
