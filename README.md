# Premium Cab Booking Prototype

A clean, calm, and premium cab booking prototype with separate customer and driver mobile applications. Built with React Native following BluSmart-inspired design principles.

## 🎨 Design Philosophy

- **Calm & Predictable**: No chaos, no flashy animations
- **Premium Aesthetic**: Royal purple (#6C4CF1) with muted mint accents
- **Fixed Pricing**: No surge pricing, transparent costs
- **Minimal UI**: One primary action per screen
- **Material Design Icons**: Consistent sizing and colors

## 📁 Project Structure

```
srinivasa-prototype/
├── srinivasa/                 # Customer Mobile App
│   └── src/
│       ├── components/
│       │   └── Icons.tsx      # Material Design SVG icons
│       ├── data/
│       │   └── mockData.json  # Mock data for customer app
│       ├── navigation/
│       │   └── MainNavigation.tsx
│       ├── screens/
│       │   ├── CustomerHomeScreen.tsx
│       │   ├── AirportBookingScreen.tsx
│       │   ├── MapRouteScreen.tsx
│       │   ├── VehicleSelectionScreen.tsx
│       │   ├── BookingConfirmationScreen.tsx
│       │   └── ActiveRideScreen.tsx
│       ├── utils/
│       │   └── colors.ts      # Design system (colors, spacing, typography)
│       └── App.tsx
└── srinivasadriverapp/        # Driver Mobile App
    └── src/
        ├── components/
        │   └── Icons.tsx      # Material Design SVG icons
        ├── data/
        │   └── mockData.json  # Mock data for driver app
        ├── navigation/
        │   └── MainNavigation.tsx
        ├── screens/
        │   ├── DriverHomeScreen.tsx
        │   ├── RideRequestScreen.tsx
        │   └── ActiveRideDriverScreen.tsx
        ├── utils/
        │   └── colors.ts      # Design system
        └── App.tsx
```

## 🎯 Features

### Customer App (srinivasa)
1. **Home Screen** - Service selection (Airport, Rental, Outstation)
2. **Airport Booking** - To/From airport with pre-filled locations
3. **Map & Route** - Static route preview with distance/time
4. **Vehicle Selection** - Choose between Sedan/SUV with fixed pricing
5. **Booking Confirmation** - Success state with OTP and driver details
6. **Active Ride** - Live tracking view with SOS button

### Driver App (srinivasadriverapp)
1. **Driver Home** - Status toggle (Available/Offline) with daily stats
2. **Ride Request** - View and accept/reject ride requests
3. **Active Ride** - Manage ride status (Arrived → Started → Completed)

## 🎨 Design System

### Colors
- **Primary**: `#6C4CF1` (Royal Purple)
- **Secondary**: `#2E2A5E` (Deep Indigo)
- **Success**: `#2ECCB0` (Muted Mint)
- **Alert**: `#E5533D` (Soft Crimson)
- **Background**: `#F7F8FC`
- **Card**: `#FFFFFF`

### Typography
- **Font**: System default (SF Pro on iOS, Roboto on Android)
- **Hierarchy**: Clear heading structure (H1, H2, H3, Body, Caption)

### Spacing
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **xxl**: 48px

## 🚀 Running the Apps

### Customer App
```bash
cd srinivasa
npm install
npm run android  # or npm run ios
```

### Driver App
```bash
cd srinivasadriverapp
npm install
npm run android  # or npm run ios
```

## 📊 Mock Data

All data is stored in `src/data/mockData.json` within each app and includes:
- Users
- Drivers (with status, ratings, vehicle info)
- Vehicles (Sedan, SUV with fixed pricing)
- Airports
- Rides
- Admin stats

## 🎯 Prototype Constraints

This is a **PROTOTYPE ONLY** with the following constraints:
- ❌ No backend
- ❌ No APIs
- ❌ No real-time sync
- ❌ No authentication
- ❌ No payments
- ❌ No GPS tracking
- ✅ JSON-driven data
- ✅ Simulated state changes
- ✅ Demo-ready UX

## 🎨 Icon System

All icons are Material Design SVG components with:
- Consistent sizing (24px default)
- Color consistency
- Proper accessibility
- Located in `src/components/Icons.tsx`

## 📱 Screen Flow

### Customer Flow
```
Home → Airport Booking → Map Route → Vehicle Selection → Confirmation → Active Ride
```

### Driver Flow
```
Home → Ride Request → Active Ride (Arrived → Started → Completed)
```

## 🎯 Key Principles

1. **Calm over Chaos**: Predictable, peaceful user experience
2. **Premium Feel**: High-quality design, not MVP
3. **Fixed Pricing**: No surge, transparent costs
4. **One Action**: Single primary CTA per screen
5. **Material Icons**: Consistent visual language

## 📝 Notes

- This is a prototype for UX validation and stakeholder demos
- No complex state management required
- All interactions simulate real behavior
- Focus on visual excellence and calm UX
