# OMG Unified Dashboard - White-Label Specification

## Overview
This document outlines the white-label approach for the OMG Unified Dashboard, maintaining Precise.ai and Madhive branding on key product features while allowing agency customization.

## White-Label Architecture

### 1. Branding Hierarchy
```
Agency Brand (Primary)
    ├── OMD Custom Logo & Colors
    ├── Agency-specific terminology
    └── Custom domain (e.g., command.omd.com)

Product Features (Co-branded)
    ├── "Powered by Precise.ai × Madhive"
    ├── Feature badges (e.g., "ZipAI by Precise")
    └── Intelligence layer branding

Technical Attribution (Footer/About)
    ├── Precise.ai cryptographic verification
    ├── Madhive platform infrastructure
    └── Technology partner logos
```

### 2. Customizable Elements

#### Agency-Level Customization
```javascript
// agency-config.ts
export interface AgencyConfig {
  // Visual Identity
  branding: {
    primaryLogo: string;
    secondaryLogo?: string;
    favicon: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      dark: string;
      light: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
  };
  
  // Custom Terminology
  terminology: {
    dashboard: string;  // e.g., "Command Center" vs "Dashboard"
    campaign: string;   // e.g., "Initiative" vs "Campaign"
    insights: string;   // e.g., "Intelligence" vs "Insights"
    optimization: string; // e.g., "SmartShift" vs "Optimization"
  };
  
  // Feature Visibility
  features: {
    showInternalMetrics: boolean;
    showMLCredits: boolean;
    showCrossPlatformLearning: boolean;
    enableZipAI: boolean;
    customModules: string[];
  };
  
  // Domain & Auth
  domain: {
    subdomain: string;  // e.g., "omd" for omd.precise.ai
    customDomain?: string; // e.g., "command.omd.com"
    ssoProvider?: 'okta' | 'azure' | 'google';
  };
}
```

### 3. Branded Feature Components

#### ZipAI Intelligence (Co-branded)
```jsx
// Maintains Precise branding on innovative features
<div className="zip-ai-module">
  <div className="feature-header">
    <h3>{agencyConfig.terminology.insights}</h3>
    <Badge>
      ZipAI™ by Precise
    </Badge>
  </div>
  <ZipAIMap />
  <div className="attribution">
    Micro-cultural targeting powered by Precise.ai
  </div>
</div>
```

#### Platform Intelligence (Co-branded)
```jsx
// Shows Madhive's role in platform orchestration
<div className="platform-control">
  <PlatformGrid />
  <div className="orchestration-badge">
    <MadhiveLogo size="small" />
    Unified Orchestration
  </div>
</div>
```

### 4. Implementation Approach

#### CSS Variable System
```css
:root {
  /* Agency customizable */
  --agency-primary: var(--custom-primary, #0984E3);
  --agency-secondary: var(--custom-secondary, #00B894);
  --agency-accent: var(--custom-accent, #FF6B6B);
  
  /* Product features (locked) */
  --precise-green: #00B894;
  --madhive-purple: #7B4FFF;
  --zipai-gradient: linear-gradient(135deg, #00B894 0%, #0984E3 100%);
}
```

#### Component Structure
```jsx
// WhiteLabelProvider.tsx
export function WhiteLabelProvider({ config, children }) {
  return (
    <ThemeProvider theme={generateTheme(config)}>
      <TerminologyProvider terms={config.terminology}>
        <FeatureProvider features={config.features}>
          {children}
        </FeatureProvider>
      </TerminologyProvider>
    </ThemeProvider>
  );
}
```

### 5. Branding Guidelines

#### Where Agency Branding Appears
1. **Header/Navigation**: Agency logo primary
2. **Login Screen**: Agency branding dominant
3. **Dashboard Headers**: Agency terminology
4. **Reports/Exports**: Agency branded templates
5. **Email Notifications**: From agency domain

#### Where Product Branding Remains
1. **Innovative Features**: 
   - ZipAI™ micro-targeting
   - Cross-platform learning algorithms
   - Cryptographic verification badges
   
2. **Technical Attributions**:
   - "Powered by Precise.ai × Madhive"
   - API documentation
   - Technical support sections
   
3. **Feature Introductions**:
   - Onboarding for new capabilities
   - Feature announcement modals
   - Technical capability badges

### 6. Configuration Examples

#### OMD Configuration
```javascript
const omdConfig: AgencyConfig = {
  branding: {
    primaryLogo: '/logos/omd-primary.svg',
    colors: {
      primary: '#FF0000',  // OMD Red
      secondary: '#000000', // OMD Black
      accent: '#0984E3',   // Precise Blue for CTAs
      dark: '#1A1A1A',
      light: '#FFFFFF'
    },
    fonts: {
      heading: 'OMD Sans, Helvetica, sans-serif',
      body: 'Arial, sans-serif'
    }
  },
  terminology: {
    dashboard: 'Command Center',
    campaign: 'Initiative',
    insights: 'Intelligence',
    optimization: 'Precision Shift'
  },
  features: {
    showInternalMetrics: true,
    showMLCredits: true,
    showCrossPlatformLearning: true,
    enableZipAI: true,
    customModules: ['omd-benchmarks', 'client-scorecards']
  },
  domain: {
    subdomain: 'omd',
    customDomain: 'command.omd.com',
    ssoProvider: 'okta'
  }
};
```

### 7. Deployment Architecture

```
┌─────────────────────────────────────────┐
│          Agency Domains                 │
├─────────────────────────────────────────┤
│  command.omd.com → omd.precise.ai      │
│  hub.phd.com → phd.precise.ai          │
│  control.hearts.com → hearts.precise.ai │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│     Precise.ai Platform (Multi-tenant)  │
├─────────────────────────────────────────┤
│  • Agency config loader                 │
│  • Theme generator                      │
│  • Feature flags                        │
│  • SSO integration                      │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│        Shared Infrastructure            │
├─────────────────────────────────────────┤
│  Madhive Platform  │  Precise Engine    │
│  • Publishers      │  • Verification    │
│  • Activation      │  • Attribution     │
│  • Optimization    │  • Privacy Layer   │
└─────────────────────────────────────────┘
```

### 8. Legal & Contractual Requirements

1. **Trademark Usage**:
   - "Powered by" attribution required
   - Feature names (ZipAI™) must retain branding
   - Cannot remove technical attribution

2. **Revenue Sharing Model**:
   - Agency white-label license fee
   - Per-seat pricing for users
   - Revenue share on media optimizations

3. **Support Model**:
   - L1: Agency branded support
   - L2: Co-branded technical support
   - L3: Precise.ai/Madhive engineering

### 9. Migration Path

**Phase 1**: Configuration Setup
- Deploy agency config
- Test branding elements
- Verify SSO integration

**Phase 2**: Soft Launch
- Internal agency users
- Select client accounts
- Gather feedback

**Phase 3**: Full Rollout
- All agency users
- Client access portals
- Custom training materials

**Phase 4**: Advanced Customization
- Custom modules
- Agency-specific features
- API extensions