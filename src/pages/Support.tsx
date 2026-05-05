import { Box, Typography, Divider, Link } from "@mui/material";

const faqs = [
  {
    q: "How do I add a new city or place?",
    a: 'Log in to the app and use the "+" button on the Cities screen to add a new city. Inside a city, navigate to a category and tap "Add place" to create a new spot.',
  },
  {
    q: "How do I delete a place or city?",
    a: "Open the place or city details and use the delete option in the top-right menu. Deleted items cannot be recovered.",
  },
  {
    q: "The app is not showing my location correctly. What should I do?",
    a: 'Make sure location permissions are granted for Where Next in your device settings. Go to Settings → Privacy → Location Services → Where Next and select "While Using".',
  },
  {
    q: "How do I request deletion of my data?",
    a: 'Send an email to the support address below with the subject "Data Deletion Request" and we will remove your data within 30 days.',
  },
  {
    q: "The app crashes or something is not working. What should I do?",
    a: "Try restarting the app. If the problem persists, contact us via the email below and describe what happened — include your device model and iOS version if possible.",
  },
];

export default function Support() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f7",
        display: "flex",
        justifyContent: "center",
        px: 2,
        py: 6,
      }}
    >
      <Box sx={{ maxWidth: 680, width: "100%" }}>
        <Typography variant="h4" fontWeight={700} color="text.primary" mb={0.5}>
          Where Next — Support
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Welcome to the Where Next support page. Here you can find answers to
          common questions and get in touch with us directly.
        </Typography>

        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 3,
            p: 3,
            mb: 4,
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            color="text.primary"
            mb={0.5}
          >
            Contact us
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Have a question, found a bug, or want to request account or data
            deletion? Send us an email and we'll get back to you as soon as
            possible.
          </Typography>
          <Link
            href="mailto:maleticnebojsa84@gmail.com"
            underline="hover"
            sx={{ fontWeight: 600, fontSize: "0.95rem" }}
          >
            maleticnebojsa84@gmail.com
          </Link>
        </Box>

        <Typography variant="h6" fontWeight={700} color="text.primary" mb={2}>
          Frequently asked questions
        </Typography>

        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 3,
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          {faqs.map((faq, i) => (
            <Box key={faq.q}>
              <Box sx={{ p: 3 }}>
                <Typography
                  variant="body1"
                  fontWeight={600}
                  color="text.primary"
                  mb={0.5}
                >
                  {faq.q}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {faq.a}
                </Typography>
              </Box>
              {i < faqs.length - 1 && <Divider />}
            </Box>
          ))}
        </Box>

        <Typography
          variant="caption"
          color="text.disabled"
          mt={5}
          display="block"
          textAlign="center"
        >
          © {new Date().getFullYear()} Where Next. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
