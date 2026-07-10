// GENERATED from tokens.json by scripts/build-tokens.mjs — DO NOT EDIT. Edit tokens.json and run `pnpm tokens`.
// Ornie design tokens — "Riverbed" theme.
// Native slivers consume tokens only, never components (D-44).
// CSS-only tokens (shadows, z-index, easing curves, deprecated aliases) are not emitted.

import SwiftUI

public enum OrnieTokens {
  public enum Palette {
    public static let river50 = Color(.sRGB, red: 0.9294, green: 0.9569, blue: 0.9451)
    public static let river100 = Color(.sRGB, red: 0.8431, green: 0.9059, blue: 0.8784)
    public static let river200 = Color(.sRGB, red: 0.7059, green: 0.8157, blue: 0.7725)
    public static let river300 = Color(.sRGB, red: 0.5451, green: 0.6980, blue: 0.6431)
    public static let river400 = Color(.sRGB, red: 0.4039, green: 0.5804, blue: 0.5294)
    public static let river500 = Color(.sRGB, red: 0.2980, green: 0.4902, blue: 0.4392)
    public static let river600 = Color(.sRGB, red: 0.2431, green: 0.4078, blue: 0.3647)
    public static let river700 = Color(.sRGB, red: 0.1961, green: 0.3294, blue: 0.2941)
    public static let river800 = Color(.sRGB, red: 0.1490, green: 0.2549, blue: 0.2275)
    public static let river900 = Color(.sRGB, red: 0.1059, green: 0.1843, blue: 0.1647)
    public static let sand0 = Color(.sRGB, red: 1.0000, green: 1.0000, blue: 1.0000)
    public static let sand50 = Color(.sRGB, red: 0.9725, green: 0.9608, blue: 0.9451)
    public static let sand100 = Color(.sRGB, red: 0.9373, green: 0.9176, blue: 0.8902)
    public static let sand200 = Color(.sRGB, red: 0.8863, green: 0.8549, blue: 0.8118)
    public static let sand300 = Color(.sRGB, red: 0.8118, green: 0.7647, blue: 0.7059)
    public static let sand400 = Color(.sRGB, red: 0.6824, green: 0.6275, blue: 0.5608)
    public static let sand500 = Color(.sRGB, red: 0.4980, green: 0.4510, blue: 0.3961)
    public static let sand600 = Color(.sRGB, red: 0.4157, green: 0.3725, blue: 0.3216)
    public static let sand700 = Color(.sRGB, red: 0.3059, green: 0.2706, blue: 0.2314)
    public static let sand800 = Color(.sRGB, red: 0.2196, green: 0.1922, blue: 0.1647)
    public static let sand900 = Color(.sRGB, red: 0.1412, green: 0.1176, blue: 0.0941)
    public static let sand950 = Color(.sRGB, red: 0.1137, green: 0.0941, blue: 0.0745)
    public static let sand1000 = Color(.sRGB, red: 0.0863, green: 0.0667, blue: 0.0510)
    public static let fur50 = Color(.sRGB, red: 0.9569, green: 0.9294, blue: 0.8980)
    public static let fur100 = Color(.sRGB, red: 0.9098, green: 0.8510, blue: 0.7843)
    public static let fur200 = Color(.sRGB, red: 0.8392, green: 0.7412, blue: 0.6392)
    public static let fur300 = Color(.sRGB, red: 0.7490, green: 0.6157, blue: 0.4902)
    public static let fur500 = Color(.sRGB, red: 0.5451, green: 0.4157, blue: 0.3098)
    public static let fur700 = Color(.sRGB, red: 0.3686, green: 0.2667, blue: 0.2000)
    public static let fur900 = Color(.sRGB, red: 0.2118, green: 0.1490, blue: 0.0980)
    public static let moss50 = Color(.sRGB, red: 0.9294, green: 0.9490, blue: 0.9176)
    public static let moss100 = Color(.sRGB, red: 0.8471, green: 0.8941, blue: 0.8235)
    public static let moss200 = Color(.sRGB, red: 0.7255, green: 0.8118, blue: 0.6824)
    public static let moss300 = Color(.sRGB, red: 0.5922, green: 0.7059, blue: 0.5373)
    public static let moss500 = Color(.sRGB, red: 0.3373, green: 0.4784, blue: 0.3059)
    public static let moss600 = Color(.sRGB, red: 0.2745, green: 0.3961, blue: 0.2471)
    public static let moss700 = Color(.sRGB, red: 0.2157, green: 0.3137, blue: 0.1922)
    public static let moss900 = Color(.sRGB, red: 0.1255, green: 0.1804, blue: 0.1137)
    public static let clay50 = Color(.sRGB, red: 0.9647, green: 0.9373, blue: 0.8824)
    public static let clay100 = Color(.sRGB, red: 0.9255, green: 0.8745, blue: 0.7529)
    public static let clay200 = Color(.sRGB, red: 0.8784, green: 0.8039, blue: 0.6314)
    public static let clay300 = Color(.sRGB, red: 0.8118, green: 0.6941, blue: 0.4706)
    public static let clay500 = Color(.sRGB, red: 0.6627, green: 0.5020, blue: 0.2196)
    public static let clay600 = Color(.sRGB, red: 0.5490, green: 0.4078, blue: 0.1569)
    public static let clay700 = Color(.sRGB, red: 0.4353, green: 0.3216, blue: 0.1216)
    public static let clay900 = Color(.sRGB, red: 0.2235, green: 0.1686, blue: 0.0863)
    public static let rust50 = Color(.sRGB, red: 0.9686, green: 0.9255, blue: 0.9098)
    public static let rust100 = Color(.sRGB, red: 0.9333, green: 0.8392, blue: 0.8039)
    public static let rust300 = Color(.sRGB, red: 0.8039, green: 0.5882, blue: 0.5059)
    public static let rust500 = Color(.sRGB, red: 0.6471, green: 0.3608, blue: 0.2784)
    public static let rust600 = Color(.sRGB, red: 0.5608, green: 0.2863, blue: 0.2118)
    public static let rust700 = Color(.sRGB, red: 0.4510, green: 0.2275, blue: 0.1686)
    public static let rust900 = Color(.sRGB, red: 0.2471, green: 0.1333, blue: 0.1020)
  }

  public enum Light {
    public static let bg = Color(.sRGB, red: 0.9725, green: 0.9608, blue: 0.9451)
    public static let surface = Color(.sRGB, red: 1.0000, green: 1.0000, blue: 1.0000)
    public static let surfaceSunken = Color(.sRGB, red: 0.9373, green: 0.9176, blue: 0.8902)
    public static let surfaceHover = Color(.sRGB, red: 0.9373, green: 0.9176, blue: 0.8902)
    public static let surfaceInverse = Color(.sRGB, red: 0.1412, green: 0.1176, blue: 0.0941)
    public static let hover = Color(.sRGB, red: 0.9725, green: 0.9608, blue: 0.9451)
    public static let selected = Color(.sRGB, red: 0.8431, green: 0.9059, blue: 0.8784)
    public static let track = Color(.sRGB, red: 0.9373, green: 0.9176, blue: 0.8902)
    public static let done = Color(.sRGB, red: 0.5451, green: 0.6980, blue: 0.6431)
    public static let border = Color(.sRGB, red: 0.8863, green: 0.8549, blue: 0.8118)
    public static let borderStrong = Color(.sRGB, red: 0.8118, green: 0.7647, blue: 0.7059)
    public static let borderHover = Color(.sRGB, red: 0.6824, green: 0.6275, blue: 0.5608)
    public static let borderSubtle = Color(.sRGB, red: 0.1412, green: 0.1176, blue: 0.0941, opacity: 0.05)
    public static let text = Color(.sRGB, red: 0.1412, green: 0.1176, blue: 0.0941)
    public static let textMuted = Color(.sRGB, red: 0.4157, green: 0.3725, blue: 0.3216)
    public static let textSubtle = Color(.sRGB, red: 0.4980, green: 0.4510, blue: 0.3961)
    public static let textOnAccent = Color(.sRGB, red: 1.0000, green: 1.0000, blue: 1.0000)
    public static let textInverse = Color(.sRGB, red: 1.0000, green: 1.0000, blue: 1.0000)
    public static let accent = Color(.sRGB, red: 0.2980, green: 0.4902, blue: 0.4392)
    public static let accentHover = Color(.sRGB, red: 0.2431, green: 0.4078, blue: 0.3647)
    public static let accentActive = Color(.sRGB, red: 0.1961, green: 0.3294, blue: 0.2941)
    public static let accentSubtle = Color(.sRGB, red: 0.9294, green: 0.9569, blue: 0.9451)
    public static let accentSubtleBorder = Color(.sRGB, red: 0.7059, green: 0.8157, blue: 0.7725)
    public static let accentText = Color(.sRGB, red: 0.2431, green: 0.4078, blue: 0.3647)
    public static let success = Color(.sRGB, red: 0.3373, green: 0.4784, blue: 0.3059)
    public static let successSubtle = Color(.sRGB, red: 0.9294, green: 0.9490, blue: 0.9176)
    public static let successText = Color(.sRGB, red: 0.2157, green: 0.3137, blue: 0.1922)
    public static let warning = Color(.sRGB, red: 0.6627, green: 0.5020, blue: 0.2196)
    public static let warningSubtle = Color(.sRGB, red: 0.9647, green: 0.9373, blue: 0.8824)
    public static let warningText = Color(.sRGB, red: 0.4353, green: 0.3216, blue: 0.1216)
    public static let danger = Color(.sRGB, red: 0.6471, green: 0.3608, blue: 0.2784)
    public static let dangerHover = Color(.sRGB, red: 0.5608, green: 0.2863, blue: 0.2118)
    public static let dangerActive = Color(.sRGB, red: 0.4510, green: 0.2275, blue: 0.1686)
    public static let dangerSubtle = Color(.sRGB, red: 0.9686, green: 0.9255, blue: 0.9098)
    public static let dangerText = Color(.sRGB, red: 0.5608, green: 0.2863, blue: 0.2118)
    public static let toneRiver = Color(.sRGB, red: 0.8431, green: 0.9059, blue: 0.8784)
    public static let toneRiverInk = Color(.sRGB, red: 0.1961, green: 0.3294, blue: 0.2941)
    public static let toneFur = Color(.sRGB, red: 0.9098, green: 0.8510, blue: 0.7843)
    public static let toneFurInk = Color(.sRGB, red: 0.3686, green: 0.2667, blue: 0.2000)
    public static let toneMoss = Color(.sRGB, red: 0.8471, green: 0.8941, blue: 0.8235)
    public static let toneMossInk = Color(.sRGB, red: 0.2157, green: 0.3137, blue: 0.1922)
    public static let toneClay = Color(.sRGB, red: 0.9255, green: 0.8745, blue: 0.7529)
    public static let toneClayInk = Color(.sRGB, red: 0.4353, green: 0.3216, blue: 0.1216)
    public static let toneStone = Color(.sRGB, red: 0.8863, green: 0.8549, blue: 0.8118)
    public static let toneStoneInk = Color(.sRGB, red: 0.3059, green: 0.2706, blue: 0.2314)
    public static let focusRing = Color(.sRGB, red: 0.2980, green: 0.4902, blue: 0.4392)
    public static let overlay = Color(.sRGB, red: 0.1412, green: 0.1176, blue: 0.0941, opacity: 0.4)
  }

  public enum Dark {
    public static let bg = Color(.sRGB, red: 0.1137, green: 0.0941, blue: 0.0745)
    public static let surface = Color(.sRGB, red: 0.1412, green: 0.1176, blue: 0.0941)
    public static let surfaceSunken = Color(.sRGB, red: 0.0863, green: 0.0667, blue: 0.0510)
    public static let surfaceHover = Color(.sRGB, red: 0.2196, green: 0.1922, blue: 0.1647)
    public static let surfaceInverse = Color(.sRGB, red: 0.9373, green: 0.9176, blue: 0.8902)
    public static let hover = Color(.sRGB, red: 0.2196, green: 0.1922, blue: 0.1647)
    public static let selected = Color(.sRGB, red: 0.1961, green: 0.3294, blue: 0.2941)
    public static let track = Color(.sRGB, red: 0.3059, green: 0.2706, blue: 0.2314)
    public static let done = Color(.sRGB, red: 0.2431, green: 0.4078, blue: 0.3647)
    public static let border = Color(.sRGB, red: 0.3059, green: 0.2706, blue: 0.2314)
    public static let borderStrong = Color(.sRGB, red: 0.4157, green: 0.3725, blue: 0.3216)
    public static let borderHover = Color(.sRGB, red: 0.4980, green: 0.4510, blue: 0.3961)
    public static let borderSubtle = Color(.sRGB, red: 0.9725, green: 0.9608, blue: 0.9451, opacity: 0.08)
    public static let text = Color(.sRGB, red: 0.9373, green: 0.9176, blue: 0.8902)
    public static let textMuted = Color(.sRGB, red: 0.6824, green: 0.6275, blue: 0.5608)
    public static let textSubtle = Color(.sRGB, red: 0.4980, green: 0.4510, blue: 0.3961)
    public static let textOnAccent = Color(.sRGB, red: 1.0000, green: 1.0000, blue: 1.0000)
    public static let textInverse = Color(.sRGB, red: 0.1412, green: 0.1176, blue: 0.0941)
    public static let accent = Color(.sRGB, red: 0.2980, green: 0.4902, blue: 0.4392)
    public static let accentHover = Color(.sRGB, red: 0.2431, green: 0.4078, blue: 0.3647)
    public static let accentActive = Color(.sRGB, red: 0.1961, green: 0.3294, blue: 0.2941)
    public static let accentSubtle = Color(.sRGB, red: 0.1059, green: 0.1843, blue: 0.1647)
    public static let accentSubtleBorder = Color(.sRGB, red: 0.1961, green: 0.3294, blue: 0.2941)
    public static let accentText = Color(.sRGB, red: 0.5451, green: 0.6980, blue: 0.6431)
    public static let success = Color(.sRGB, red: 0.3373, green: 0.4784, blue: 0.3059)
    public static let successSubtle = Color(.sRGB, red: 0.1255, green: 0.1804, blue: 0.1137)
    public static let successText = Color(.sRGB, red: 0.5922, green: 0.7059, blue: 0.5373)
    public static let warning = Color(.sRGB, red: 0.6627, green: 0.5020, blue: 0.2196)
    public static let warningSubtle = Color(.sRGB, red: 0.2235, green: 0.1686, blue: 0.0863)
    public static let warningText = Color(.sRGB, red: 0.8118, green: 0.6941, blue: 0.4706)
    public static let danger = Color(.sRGB, red: 0.6471, green: 0.3608, blue: 0.2784)
    public static let dangerHover = Color(.sRGB, red: 0.5608, green: 0.2863, blue: 0.2118)
    public static let dangerActive = Color(.sRGB, red: 0.4510, green: 0.2275, blue: 0.1686)
    public static let dangerSubtle = Color(.sRGB, red: 0.2471, green: 0.1333, blue: 0.1020)
    public static let dangerText = Color(.sRGB, red: 0.8039, green: 0.5882, blue: 0.5059)
    public static let toneRiver = Color(.sRGB, red: 0.1059, green: 0.1843, blue: 0.1647)
    public static let toneRiverInk = Color(.sRGB, red: 0.7059, green: 0.8157, blue: 0.7725)
    public static let toneFur = Color(.sRGB, red: 0.2118, green: 0.1490, blue: 0.0980)
    public static let toneFurInk = Color(.sRGB, red: 0.8392, green: 0.7412, blue: 0.6392)
    public static let toneMoss = Color(.sRGB, red: 0.1255, green: 0.1804, blue: 0.1137)
    public static let toneMossInk = Color(.sRGB, red: 0.7255, green: 0.8118, blue: 0.6824)
    public static let toneClay = Color(.sRGB, red: 0.2235, green: 0.1686, blue: 0.0863)
    public static let toneClayInk = Color(.sRGB, red: 0.8784, green: 0.8039, blue: 0.6314)
    public static let toneStone = Color(.sRGB, red: 0.2196, green: 0.1922, blue: 0.1647)
    public static let toneStoneInk = Color(.sRGB, red: 0.8863, green: 0.8549, blue: 0.8118)
    public static let focusRing = Color(.sRGB, red: 0.5451, green: 0.6980, blue: 0.6431)
    public static let overlay = Color(.sRGB, red: 0.0000, green: 0.0000, blue: 0.0000, opacity: 0.55)
  }

  public enum Typography {
    public static let fontFamily = "Manrope"
    public static let textXs: CGFloat = 12
    public static let textSm: CGFloat = 13
    public static let textMd: CGFloat = 15
    public static let textLg: CGFloat = 17
    public static let textXl: CGFloat = 20
    public static let text2xl: CGFloat = 24
    public static let text3xl: CGFloat = 30
    public static let text4xl: CGFloat = 38
    public static let leadingTight: CGFloat = 1.25
    public static let leadingNormal: CGFloat = 1.5
    public static let weightRegular: Int = 400
    public static let weightMedium: Int = 500
    public static let weightSemibold: Int = 600
    public static let weightBold: Int = 700
    public static let weightExtrabold: Int = 800
  }

  public enum Space {
    public static let s1: CGFloat = 4
    public static let s2: CGFloat = 8
    public static let s3: CGFloat = 12
    public static let s4: CGFloat = 16
    public static let s5: CGFloat = 20
    public static let s6: CGFloat = 24
    public static let s8: CGFloat = 32
    public static let s10: CGFloat = 40
    public static let s12: CGFloat = 48
    public static let s16: CGFloat = 64
  }

  public enum Radius {
    public static let xs: CGFloat = 6
    public static let sm: CGFloat = 8
    public static let md: CGFloat = 12
    public static let lg: CGFloat = 16
    public static let full: CGFloat = 999
  }

  public enum Motion {
    /// milliseconds — collapse to ~0 when the OS reduce-motion setting is on
    public static let durationQuick: Double = 120
    /// milliseconds — collapse to ~0 when the OS reduce-motion setting is on
    public static let durationGentle: Double = 220
  }
}
