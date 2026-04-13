import { CartProvider } from "@/context/CartContext";
import Container from "@mui/material/Container";

export default function ContainerLayout({ children }) {
  return (
  
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {children}
      </Container>
 
  );
}
