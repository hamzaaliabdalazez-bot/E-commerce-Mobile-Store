"use client";

import { useState, useContext, useEffect, useMemo } from "react";
import { CartContext, CartProvider } from "@/context/CartContext";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import "../../app/globals.css";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Switch from "@mui/material/Switch";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Badge, { badgeClasses } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { ThemeModeContext } from "@/context/ThemeContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Cart", href: "/cart" },
];

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { data: session } = useSession();
  const { mode, toggleTheme, language, toggleLanguage } =
    useContext(ThemeModeContext);
  const { cart, hydrated, totalItems } = useContext(CartContext);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="sticky" color="primary" elevation={1}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left */}
        <IconButton color="inherit" edge="start" onClick={() => setOpen(true)}>
          <MenuIcon />
        </IconButton>

        <Typography
          component={Link}
          href="/"
          variant="h6"
          sx={{ color: "inherit", textDecoration: "none" }}
        >
          Mobile Store
        </Typography>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Button component={Link} href="/products" color="inherit">
            Products
          </Button>

          {/* Cart */}

          <IconButton href="/cart" component={Link}>
            <ShoppingCartIcon fontSize="small" color="secondary" />
            <CartBadge
              badgeContent={hydrated ? totalItems : 0}
              color="secondary"
              overlap="circular"
            />
          </IconButton>

          {/* Theme */}
          <Switch
            checked={mode === "dark"}
            onChange={toggleTheme}
            color="default"
          />

          {/* Language */}
          <Button onClick={toggleLanguage} color="inherit">
            {language}
          </Button>

          {/* Auth */}
          {session ? (
            <>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                {session.user?.image ? (
                  <Avatar
                    src={session.user.image}
                    alt={session.user.name || "User"}
                  />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem
                  component={Link}
                  href="/dashboard/user"
                  onClick={handleMenuClose}
                >
                  My Account
                </MenuItem>

                {session.user?.role === "ADMIN" && (
                  <MenuItem
                    component={Link}
                    href="/dashboard/admin"
                    onClick={handleMenuClose}
                  >
                    Admin Dashboard
                  </MenuItem>
                )}

                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    signOut({ callbackUrl: "/" });
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button component={Link} href="/auth/login" color="inherit">
              Login
            </Button>
          )}
        </div>
      </Toolbar>

      {/* Drawer */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 260 }}>
          {navLinks.map((link) => (
            <ListItem key={link.href} disablePadding>
              <ListItemButton
                component={Link}
                href={link.href}
                className="s"
                onClick={() => setOpen(false)}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}

          {["mobiles", "covers", "chargers"].map((category) => (
            <ListItem key={category} disablePadding>
              <ListItemButton
                component={Link}
                href={`/categories/${category}`}
                onClick={() => setOpen(false)}
              >
                <ListItemText
                  primary={category.charAt(0).toUpperCase() + category.slice(1)}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar> 
  );
}
