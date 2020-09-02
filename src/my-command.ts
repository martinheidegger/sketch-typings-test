import 'sketch-typings'

// import sketch from 'sketch'
import assert from 'assert'
import dom, { ICurvePoint, Shape, CurvePoint } from 'sketch/dom'
import {
  Document,
  ShapePath,
  Text,
  Flow,
  Library,
  Style,
  // CurvePoint,
  // TODO: fromSketchJSON,
  // TODO: createLayerFromData,
  // Slice
} from 'sketch/dom'
import {
  INPUT_TYPE
} from 'sketch/ui'
import Console from '@skpm/console'

const console = Console()

const { SaveMode, ColorSpace } = Document
const { ShapeType } = ShapePath
const { LineSpacing, Alignment, VerticalAlignment } = Text
const { AnimationType } = Flow
const { ImportableObjectType, LibraryType } = Library
const { BlendingMode, BlurType, FillType, BorderPosition, Arrowhead, LineEnd, LineJoin, GradientType } = Style

export function notExecuted () {
  const d: Document = null
  d.save(undefined, { saveMode: 1 })
  d.save(undefined, { saveMode: 3 })
  d.save(undefined, { saveMode: Document.SaveMode.SaveTo })

  let s: ShapePath.ShapeType
  s = ShapePath.ShapeType.Custom
  console.log(s)
}

function assertEnum <TEnum extends { [key: string]: TValue}, TValue extends string | number>(name: string, current: TEnum, expected: TEnum): void {
  if (current === null || current === undefined) {
    assert.fail(`${name} does not exist`)
  }
  const keys = new Set(Object.keys(current))
  for (const key in expected) {
    keys.delete(key)
    assert.equal(current[key], expected[key], `${name}.${key} doesn't match [current=${current[key]}] !== [expected=${expected[key]}]`)
  }
  if (keys.size > 0) {
    assert.fail(`${name} has more properties than expected: ${Array.from(keys).join(', ')}`)
  }
}

export default function() {
  console.log('test: start.')
  assertEnum('SaveMode', SaveMode, {
    Save: 0,
    SaveAs: 1,
    SaveTo: 2
  })
  assertEnum('ShapeType', ShapeType, {
    Rectangle: 'Rectangle',
    Oval: 'Oval',
    Triangle: 'Triangle',
    Polygon: 'Polygon',
    Star: 'Star',
    Custom: 'Custom'
  })
  assertEnum('LineSpacing', LineSpacing, {
    constantBaseline: 'constantBaseline',
    variable: 'variable',
    natural: 'natural'
  })
  assertEnum('ShapePath.PointType', ShapePath.PointType, {
    Undefined: 'Undefined',
    Straight: 'Straight',
    Mirrored: 'Mirrored',
    Asymmetric: 'Asymmetric',
    Disconnected: 'Disconnected'
  })
  assertEnum('ColorSpace', ColorSpace, {
    Unmanaged: 'Unmanaged',
    sRGB: 'sRGB',
    P3: 'P3'
  })
  assertEnum('AnimationType', AnimationType, {
    none: 'none',
    slideFromBottom: 'slideFromBottom',
    slideFromLeft: 'slideFromLeft',
    slideFromRight: 'slideFromRight',
    slideFromTop: 'slideFromTop'
  })
  assertEnum('Alignment', Alignment, {
    left: 'left',
    right: 'right',
    center: 'center',
    justified: 'justified',
    natural: 'natural'
  })
  assertEnum('VerticalAlignment', VerticalAlignment, {
    top: 'top',
    bottom: 'bottom',
    center: 'center'
  })
  assertEnum('ImportableObjectType', ImportableObjectType, {
    Symbol: 'Symbol',
    LayerStyle: 'LayerStyle',
    TextStyle: 'TextStyle',
    Unknown: 'Unknown'
  })
  assertEnum('LibraryType', LibraryType, {
    Internal: 'Internal',
    User: 'LocalUser',
    Remote: 'RemoteUser',
    LocalUser: 'LocalUser',
    RemoteUser: 'RemoteUser',
    RemoteTeam: 'RemoteTeam',
    RemoteThirdParty: 'RemoteThirdParty'
  })
  assertEnum('BlendingMode', BlendingMode, {
    Normal: 'Normal',
    Darken: 'Darken',
    Multiply: 'Multiply',
    ColorBurn: 'ColorBurn',
    Lighten: 'Lighten',
    Screen: 'Screen',
    ColorDodge: 'ColorDodge',
    Overlay: 'Overlay',
    SoftLight: 'SoftLight',
    HardLight: 'HardLight',
    Difference: 'Difference',
    Exclusion: 'Exclusion',
    Hue: 'Hue',
    Saturation: 'Saturation',
    Color: 'Color',
    Luminosity: 'Luminosity',
  })
  assertEnum('BlurType', BlurType, {
    Gaussian: 'Gaussian',
    Motion: 'Motion',
    Zoom: 'Zoom',
    Background: 'Background',
  })
  
  assertEnum('FillType', FillType, {
    Color: 'Color',
    Gradient: 'Gradient',
    Pattern: 'Pattern',
    color: 'Color',
    gradient: 'Gradient',
    pattern: 'Pattern'
  }) 
  assertEnum('BorderPosition', BorderPosition, {
    Center: 'Center',
    Inside: 'Inside',
    Outside: 'Outside',
    Both: 'Both'
  })
  assertEnum('Arrowhead', Arrowhead, {
    None: 'None',
    OpenArrow: 'OpenArrow',
    FilledArrow: 'FilledArrow',
    Line: 'Line',
    OpenCircle: 'OpenCircle',
    FilledCircle: 'FilledCircle',
    OpenSquare: 'OpenSquare',
    FilledSquare: 'FilledSquare',
    ClosedArrow: 'FilledArrow'
  })
  assertEnum('LineEnd', LineEnd, {
    Butt: 'Butt',
    Round: 'Round',
    Projecting: 'Projecting',
  })
  assertEnum('LineJoin', LineJoin, {
    Miter: 'Mitter',
    Round: 'Round',
    Bevel: 'Bevel',
  })
  assertEnum('GradientType', GradientType, {
    Linear: 'Linear',
    Radial: 'Radial',
    Angular: 'Angular',
  })
  assertEnum('INPUT_TYPE', INPUT_TYPE, {
    string: 'string',
    selection: 'selection',
    slider: 'slider'
  })
  const pathA = ShapePath.fromSVGPath('M10 10 H 90 V 90 H 10 L 10 10')
  const point: ICurvePoint = {
    point: { x: 0, y: 0 },
    curveTo: { x: 0, y: 0 },
    curveFrom: { x: 0, y: 0 },
    pointType: ShapePath.PointType.Asymmetric,
    cornerRadius: 10
  }
  const pathB = new ShapePath({
    shapeType: ShapeType.Polygon,
    points: [point]
  })
  type CurvePoint = typeof pathB.points[0]
  console.log(pathB.points[0].point.asCGPoint())
  console.log((pathA.points[0] as CurvePoint).constructor['PointType'] === ShapePath.PointType)
  // console.log(CurvePoint) // Will result in error as an interface is used as value :-p
  // console.log(CurvePoint.PointType.Asymmetric)
  console.log(Object.keys(dom))
  console.log('test: done.')
}
