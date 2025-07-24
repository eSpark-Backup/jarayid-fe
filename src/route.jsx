import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layout/auth-layout";
import PrivateLayout from "./layout/private-layout";
import AdminLayout from "./layout/dashboard-layout";
import {
  Login,
  Signup,
  VerifyEmail,
  ChangePassword,
  Home,
  TermsOfUse,
  PrivacyPolicy,
  FAQSection,
  ArticleDetails,
  ReadLater,
  Dashboard,
  TermsPrivacyScreen,
  FAQ,
  Users,
  ArticlesManagement,
  SponsorAccount,
  SentryBugMonitor,
  Cookies,
  Adfree,
  ContactUs,
  ExternalLink,
  RssSummarization,
  Categories,
  ManualPosting,
  SeoManagement,
} from "./pages";
import { ScrollTop } from "./components";

const Router = () => {
  return (
    <>
      <ScrollTop />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ChangePassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Route>

        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/:id" element={<ArticleDetails />} />
          <Route path="/faq" element={<FAQSection />} />
          <Route path="/read-later" element={<ReadLater />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/term-privacy" element={<TermsPrivacyScreen />} />
          <Route path="/admin/faq" element={<FAQ />} />
          <Route path="/admin/users" element={<Users />} />
          <Route
            path="/admin/articles-management"
            element={<ArticlesManagement />}
          />
          <Route path="/admin/sponsor-account" element={<SponsorAccount />} />
          <Route
            path="/admin/sentry-bug-monitor"
            element={<SentryBugMonitor />}
          />
          <Route path="/admin/cookies" element={<Cookies />} />
          <Route path="/admin/ad-free" element={<Adfree />} />
          <Route path="/admin/contact-us" element={<ContactUs />} />
          <Route path="/admin/external-links" element={<ExternalLink />} />
          <Route path="/admin/rss" element={<RssSummarization />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/manual-posting" element={<ManualPosting />} />
          <Route path="/admin/seo-management" element={<SeoManagement />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default Router;
