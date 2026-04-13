import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <footer>
      <Container
        sx={{
          py: 3,
          px: 2,
          textAlign: "center",
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "background.paper",
          width: "100%",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Mobile Store. Built with Next.js and
          Material UI.
        </Typography>
      </Container>
    </footer>
  );
}
