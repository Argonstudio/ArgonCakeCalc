# ArgonCakeCalc

[English](README.md) · [Русский](README.ru.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Norsk bokmål](README.nb.md) · [Español](README.es.md) · [Italiano](README.it.md) · [简体中文](README.zh.md) · [日本語](README.ja.md)

**Conoce el coste real antes de comunicar un precio al cliente.**

> **Demo en línea:** [https://argonstudio.github.io/ArgonCakeCalc/](https://argonstudio.github.io/ArgonCakeCalc/)  
> **Pago de la licencia:** **ENLACE DE PAGO DE ROBOKASSA PENDIENTE**

ArgonCakeCalc es una herramienta de cálculo de costes para profesionales de la repostería. Permite crear recetas, mantener listas de ingredientes y suministros, montar productos terminados —incluidas tartas de varios pisos con visualización— y calcular al instante los costes y el beneficio. Las recetas y los productos creados se pueden exportar a PDF.

Tú decides el precio de la licencia. El precio mínimo de una licencia perpetua es **1 USD (0,89 EUR al tipo de cambio actual)**. Puedes descargar y probar la aplicación completa antes de pagar. Consulta la sección [Licencia, prueba y pago](#licencia-prueba-y-pago).

El equivalente en euros indicado entre paréntesis se calcula según los tipos de referencia consultados el 3 de noviembre de 2026. El proveedor de pagos puede mostrar otro importe debido a su tipo de cambio, redondeos o comisiones. Comprueba siempre el importe que aparece antes de confirmar el pago.

No necesitas registrarte, contratar una suscripción ni usar una base de datos en la nube. Tus recetas y precios permanecen en el navegador de tu dispositivo. La aplicación funciona localmente, sin instalación y sin conexión a Internet.

## Inicio rápido

La aplicación consta de un único archivo HTML. No hace falta instalar nada.

1. Abre el [repositorio de ArgonCakeCalc en GitHub](https://github.com/Argonstudio/ArgonCakeCalc) y entra en el archivo [`ArgonCakeCalc.html`](ArgonCakeCalc.html).
2. En la página del archivo, pulsa el icono de descarga (**Download raw file**) y guarda el archivo en una carpeta donde vaya a permanecer.
3. Abre el archivo guardado con un navegador moderno en tu ordenador, tableta o teléfono.

El archivo contiene la aplicación, todas las traducciones de la interfaz, los estilos y las fuentes para generar PDF. Después de descargarlo, puede funcionar sin conexión a Internet.

¿Prefieres no descargar nada? Abre el sitio web: [sitio web de ArgonCakeCalc](https://argonstudio.github.io/ArgonCakeCalc/shop/). Con una dirección HTTPS estable, la aplicación también puede prepararse para funcionar sin conexión después de la primera carga.

La interfaz se abre en inglés. Dentro de la aplicación puedes cambiar a ruso, francés, alemán, noruego bokmål, español, italiano, chino simplificado o japonés.

Para desarrolladores: el programa se puede modificar y volver a compilar. Consulta [DEVELOPMENT.md](DEVELOPMENT.md) (solo en inglés). Un asistente de programación con IA puede ayudarte a explorar el código y realizar cambios.

> [!WARNING]
> **Los datos se guardan en el navegador, no dentro del archivo HTML.** Si mueves o cambias el nombre del archivo, cambias de navegador, borras los datos del navegador o utilizas el modo privado, puedes perder el acceso a tus recetas y precios. Mantén el archivo en un mismo lugar, ábrelo siempre con el mismo navegador y exporta periódicamente una copia de seguridad JSON. Consulta [Tus datos y copias de seguridad](#tus-datos-y-copias-de-seguridad).

## Qué ofrece la aplicación

- **Materiales.** Mantén un catálogo de ingredientes, decoración, envases y consumibles. Para cada elemento, indica el precio del envase, la cantidad que contiene, la unidad de medida, la categoría y, cuando sea necesario, la densidad. Se admiten gramos, kilogramos, mililitros y litros. La masa y el volumen solo se convierten entre sí cuando se conoce la densidad; las unidades no se convierten automáticamente en peso.
- **Recetas y componentes.** Crea recetas con rendimiento, pérdidas durante la preparación, instrucciones y líneas de ingredientes. Un componente puede ser un material u otra receta: un relleno puede incluir una crema y una crema puede incluir un almíbar. Las recetas anidadas se desglosan hasta llegar a los materiales originales y los componentes repetidos se agrupan en una lista de compra clara. Cuando cambia el precio de un material, todas las recetas y productos que dependen de él se recalculan automáticamente.
- **Constructor de productos.** Monta un producto terminado con bizcochos, rellenos, cremas, almíbares para humedecer, coberturas, decoración y envases. Guarda productos, duplícalos como plantillas y compara distintos precios de venta sin modificar el cálculo guardado.
- **Coste total.** Añade mano de obra, electricidad, gastos de entrega, envases, otros gastos y una reserva para pérdidas. Después, establece un margen sobre el coste o un margen de beneficio objetivo y, si lo necesitas, un beneficio mínimo. El coste solo incluye la parte del envase que realmente se utiliza; en la lista de compra, el número de envases se redondea al alza.
- **Escalado.** Recalcula una receta según el rendimiento deseado o el diámetro y la altura de una tarta redonda. Cada línea de ingredientes puede escalarse proporcionalmente, según la superficie, mantenerse fija o redondearse a unidades enteras. La geometría de la tarta es una estimación auxiliar, no un cálculo técnico de resistencia estructural ni de seguridad alimentaria.
- **PDF, lista de compra y copia de seguridad.** Exporta un PDF con ingredientes, materias primas, instrucciones, coste, precio recomendado y dimensiones. Descarga una lista de compra para la producción o para compartirla con la persona que prepara el pedido. Guarda una copia JSON completa para transferir los datos entre navegadores o dispositivos.

## Tu primer cálculo

En el primer inicio puedes comenzar con un espacio de trabajo vacío o cargar una demostración ficticia. La demo permite entender rápidamente el flujo de trabajo, pero sus precios son ejemplos y no representan los precios reales del mercado.

1. Añade los precios de compra que pagas realmente.
2. Crea una receta e indica su rendimiento y las pérdidas.
3. Monta un producto y define sus dimensiones o el número de porciones.
4. Añade mano de obra, electricidad, envases y otros gastos.
5. Compara el precio de venta calculado mediante margen sobre coste y mediante margen objetivo.
6. Exporta un PDF y una lista de compra; después, guarda una copia JSON.

## Cómo se calculan los precios

- Rendimiento después de pérdidas = rendimiento introducido × porcentaje restante después de las pérdidas.
- Precio con margen sobre coste = coste total × (1 + margen % ÷ 100).
- Precio con margen objetivo = coste total ÷ (1 − margen % ÷ 100).
- El precio recomendado se redondea hacia arriba según la precisión de la moneda seleccionada.
- Los cálculos son precisos: los resultados intermedios no se redondean por adelantado.
- Las recetas anidadas se desglosan en las cantidades de los materiales originales.
- En la lista de compra, los envases se redondean hacia arriba; en el coste solo se contabiliza la fracción realmente utilizada.
- Elegir una moneda solo cambia su símbolo y su precisión. No se realiza ninguna conversión según el tipo de cambio.

Las fórmulas y las hipótesis se describen en las [reglas de cálculo](docs/CALCULATIONS.md).

## Tus datos y copias de seguridad

Los materiales, las recetas, los productos y los ajustes se guardan en IndexedDB del navegador, por separado para cada dirección del sitio o ubicación del archivo. El idioma de la interfaz se guarda en un pequeño ajuste local. No hay cuentas, analítica, sincronización oculta en la nube ni una base de datos de recetas en un servidor. No se envía nada sin que tú realices una acción.

Exporta copias JSON con regularidad y hazlo siempre antes de mover o cambiar el nombre del archivo HTML. Borrar los datos del navegador, utilizar la navegación privada, cambiar la dirección del sitio, mover el archivo o perder el dispositivo puede dejar inaccesible la base de datos local. El almacenamiento para archivos locales (`file://`) puede comportarse de forma diferente según el navegador; para un uso habitual, una dirección HTTPS estable es más fiable. Permitir el almacenamiento persistente del navegador no sustituye a las copias de seguridad.

## Limitaciones

Los PDF se generan en tu dispositivo, sin abrir el diálogo de impresión ni enviar datos a un servidor. Se admiten caracteres latinos, cirílicos, chinos y japoneses. Las fuentes para chino y japonés aumentan el tamaño del archivo de la aplicación. Los emoji no compatibles y los caracteres poco frecuentes pueden aparecer como `?` en los PDF.

La aplicación no incluye gestión de inventario, módulo fiscal, conversión de divisas, gestión de pedidos, cuentas en la nube, sincronización entre dispositivos ni cálculos técnicos de seguridad estructural de tartas. Comprueba los resultados por tu cuenta antes de utilizarlos en producción o de comunicar un precio a un cliente.

## Licencia, prueba y pago

ArgonCakeCalc se distribuye bajo la **ArgonCakeCalc Commercial Source-Available License, versión 1.0**. El código fuente está disponible públicamente para su consulta, pero esa visibilidad no concede permiso para redistribuir, transferir o publicar versiones modificadas para terceros. Puedes modificar el programa para uso personal.

Antes de pagar, puedes descargar y utilizar gratuitamente la aplicación completa durante **un (1) mes** para evaluar sus funciones y comprobar si se adapta a tus necesidades. La aplicación está disponible de inmediato; no se necesita una clave de activación ni confirmar una cuenta.

Tras completarse el pago, se considera que la licencia no exclusiva se ha concedido inmediatamente. Tú eliges el importe de la licencia, desde **1 USD (0,89 EUR al tipo de cambio actual)** o el equivalente que muestre el proveedor de pagos. Puedes ver el importe antes de confirmarlo y decides voluntariamente. Cualquier importe que elijas, incluso si es superior al que esperabas posteriormente, se considera una elección consciente y no se reembolsa únicamente porque cambies de opinión o dejes de utilizar el programa.

El equivalente en euros indicado entre paréntesis se calcula según los tipos de referencia consultados el 3 de noviembre de 2026. Prevalece el importe que muestre el proveedor en el momento del pago.

Una vez concedida la licencia, solo se estudiará un reembolso en caso de un cargo duplicado, un error técnico del sistema de pago u otro supuesto expresamente previsto por la legislación aplicable. Envía la solicitud a `voit.ne@gmail.com` e incluye la fecha del pago, el importe, el correo electrónico del pagador y el identificador de la operación de Robokassa.

El programa se proporciona **«TAL CUAL» (AS IS)**. El desarrollador no garantiza que satisfaga expectativas concretas, procesos empresariales o el propósito previsto por el usuario y, en la máxima medida permitida por la ley, no será responsable de daños a la actividad, los ingresos, los beneficios, los datos, la reputación o las operaciones. El usuario es responsable de comprobar el programa y decidir si es adecuado para sus necesidades.

Lee [LICENSE](LICENSE), [NOTICE](NOTICE), [ADDITIONAL_TERMS.md](ADDITIONAL_TERMS.md) y las [licencias de componentes de terceros](THIRD_PARTY.md).

## Vendedor y asistencia

- **Vendedor / titular de los derechos:** trabajador por cuenta propia Ivan Anatolyevich Voitkov
- **Número de identificación fiscal (INN):** 862203800782
- **Producto de software:** ArgonCakeCalc
- **Concepto del pago:** concesión de un derecho no exclusivo de uso del programa bajo una licencia comercial
- **Asistencia y consultas:** `voit.ne@gmail.com`
- **Página de pago:** **ENLACE DE PAGO DE ROBOKASSA PENDIENTE**
- **Sitio web del servicio:** https://argonstudio.github.io/ArgonCakeCalc/shop/

El pago es una tarifa de licencia, no una donación. El bloque completo de información para Robokassa y las autoridades de control se encuentra en [docs/ROBOKASSA.md](docs/ROBOKASSA.md).

## Autor

**Ivan Voitkov** · [sitio web del autor](https://argon-studio.ru/) · [GitHub](https://github.com/Argonstudio) · [repositorio del proyecto](https://github.com/Argonstudio/ArgonCakeCalc)

ChatGPT (OpenAI) es coautor. Gracias a los desarrolladores de esta magnífica herramienta.
