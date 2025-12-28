#!/usr/bin/env python3
"""
Script para homologar los footers de todas las páginas del sitio OrigenLab
"""
import os
import re

# Footer para páginas en /categorias/ (un nivel arriba)
FOOTER_CATEGORIAS = '''  <!-- Footer -->
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer-main">
        <div class="footer-column footer-brand">
          <div class="footer-logo">
            <a href="../index.html">
              <img src="../img/origenlab.webp" alt="OrigenLab" width="160" height="36" style="object-fit: contain; filter: brightness(0) invert(1);">
            </a>
          </div>
          <p class="footer-tagline">Donde los Negocios Mexicanos se Conectan</p>
          <div class="footer-social">
            <a href="https://linkedin.com/company/origenlab" target="_blank" rel="noopener" aria-label="Síguenos en LinkedIn" class="social-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://twitter.com/origenlab_mx" target="_blank" rel="noopener" aria-label="Síguenos en Twitter" class="social-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a href="https://facebook.com/origenlab" target="_blank" rel="noopener" aria-label="Síguenos en Facebook" class="social-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>

        <div class="footer-column">
          <h3 class="footer-column-title">Categorías</h3>
          <ul class="footer-links">
            <li><a href="eventos.html">Eventos Corporativos</a></li>
            <li><a href="fiestas-infantiles.html">Fiestas Infantiles</a></li>
            <li><a href="seguridad-privada.html">Seguridad Privada</a></li>
            <li><a href="equipo-contra-incendios.html">Equipo Contra Incendios</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3 class="footer-column-title">Empresa</h3>
          <ul class="footer-links">
            <li><a href="../index.html#por-que-origenlab">Acerca de OrigenLab</a></li>
            <li><a href="../index.html#registrar-empresa">Contacto</a></li>
            <li><a href="../blog.html">Blog</a></li>
            <li><a href="../index.html#recursos">Trabaja con Nosotros</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3 class="footer-column-title">Para Empresas</h3>
          <ul class="footer-links">
            <li><a href="../index.html#registrar-empresa">Registrar Empresa</a></li>
            <li><a href="../index.html#planes-premium">Planes Premium</a></li>
            <li><a href="../index.html#recursos">Soluciones B2B</a></li>
            <li><a href="../index.html#recursos">API Empresarial</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3 class="footer-column-title">Recursos</h3>
          <ul class="footer-links">
            <li><a href="../index.html#recursos">Centro de Ayuda</a></li>
            <li><a href="../index.html#por-que-origenlab">Guías B2B</a></li>
            <li><a href="../index.html#registrar-empresa">Webinars</a></li>
            <li><a href="../index.html#recursos">Reportes</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3 class="footer-column-title">Legal</h3>
          <ul class="footer-links">
            <li><a href="../index.html#recursos">Aviso de Privacidad</a></li>
            <li><a href="../index.html#recursos">Términos y Condiciones</a></li>
            <li><a href="../index.html#recursos">Política de Cookies</a></li>
            <li><a href="../index.html#recursos">Cumplimiento</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">
          &copy; 2025 OrigenLab. Todos los derechos reservados. Hecho con <span class="heart">♥</span> en México.
        </p>
        <div class="footer-certifications">
          <span class="footer-cert">🔒 SSL Seguro</span>
          <span class="footer-cert">✓ Datos Verificados SAT</span>
          <span class="footer-cert">🇲🇽 100% Mexicano</span>
        </div>
      </div>
    </div>
  </footer>'''

# Footer para páginas en /categorias/[subcategoria]/ (dos niveles arriba)
FOOTER_EMPRESAS = '''  <!-- Footer -->
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer-main">
        <div class="footer-column footer-brand">
          <div class="footer-logo">
            <a href="../../index.html">
              <img src="../../img/origenlab.webp" alt="OrigenLab" width="160" height="36" style="object-fit: contain; filter: brightness(0) invert(1);">
            </a>
          </div>
          <p class="footer-tagline">Donde los Negocios Mexicanos se Conectan</p>
          <div class="footer-social">
            <a href="https://linkedin.com/company/origenlab" target="_blank" rel="noopener" aria-label="Síguenos en LinkedIn" class="social-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://twitter.com/origenlab_mx" target="_blank" rel="noopener" aria-label="Síguenos en Twitter" class="social-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a href="https://facebook.com/origenlab" target="_blank" rel="noopener" aria-label="Síguenos en Facebook" class="social-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>

        <div class="footer-column">
          <h3 class="footer-column-title">Categorías</h3>
          <ul class="footer-links">
            <li><a href="../eventos.html">Eventos Corporativos</a></li>
            <li><a href="../fiestas-infantiles.html">Fiestas Infantiles</a></li>
            <li><a href="../seguridad-privada.html">Seguridad Privada</a></li>
            <li><a href="../equipo-contra-incendios.html">Equipo Contra Incendios</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3 class="footer-column-title">Empresa</h3>
          <ul class="footer-links">
            <li><a href="../../index.html#por-que-origenlab">Acerca de OrigenLab</a></li>
            <li><a href="../../index.html#registrar-empresa">Contacto</a></li>
            <li><a href="../../blog.html">Blog</a></li>
            <li><a href="../../index.html#recursos">Trabaja con Nosotros</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3 class="footer-column-title">Para Empresas</h3>
          <ul class="footer-links">
            <li><a href="../../index.html#registrar-empresa">Registrar Empresa</a></li>
            <li><a href="../../index.html#planes-premium">Planes Premium</a></li>
            <li><a href="../../index.html#recursos">Soluciones B2B</a></li>
            <li><a href="../../index.html#recursos">API Empresarial</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3 class="footer-column-title">Recursos</h3>
          <ul class="footer-links">
            <li><a href="../../index.html#recursos">Centro de Ayuda</a></li>
            <li><a href="../../index.html#por-que-origenlab">Guías B2B</a></li>
            <li><a href="../../index.html#registrar-empresa">Webinars</a></li>
            <li><a href="../../index.html#recursos">Reportes</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3 class="footer-column-title">Legal</h3>
          <ul class="footer-links">
            <li><a href="../../index.html#recursos">Aviso de Privacidad</a></li>
            <li><a href="../../index.html#recursos">Términos y Condiciones</a></li>
            <li><a href="../../index.html#recursos">Política de Cookies</a></li>
            <li><a href="../../index.html#recursos">Cumplimiento</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">
          &copy; 2025 OrigenLab. Todos los derechos reservados. Hecho con <span class="heart">♥</span> en México.
        </p>
        <div class="footer-certifications">
          <span class="footer-cert">🔒 SSL Seguro</span>
          <span class="footer-cert">✓ Datos Verificados SAT</span>
          <span class="footer-cert">🇲🇽 100% Mexicano</span>
        </div>
      </div>
    </div>
  </footer>'''

def fix_footer(filepath, new_footer):
    """Reemplaza el footer en un archivo HTML"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Patrón para encontrar el footer completo
    pattern = r'<!-- Footer -->.*?</footer>'

    if re.search(pattern, content, re.DOTALL):
        new_content = re.sub(pattern, new_footer.strip(), content, flags=re.DOTALL)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    else:
        # Intentar con patrón alternativo
        pattern2 = r'<footer class="footer"[^>]*>.*?</footer>'
        if re.search(pattern2, content, re.DOTALL):
            new_content = re.sub(pattern2, new_footer.strip(), content, flags=re.DOTALL)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True
    return False

base_path = '/Users/carsolio/Desktop/PAGINAS-HTML/ORIGENLAB'

# Páginas de categorías principales (un nivel)
categorias_principales = [
    'categorias/eventos.html',
    'categorias/fiestas-infantiles.html',
    'categorias/seguridad-privada.html',
    'categorias/equipo-contra-incendios.html',
    'categorias/categorias.html'
]

# Perfiles de empresas (dos niveles)
empresas_dirs = [
    'categorias/eventos',
    'categorias/fiestas-infantiles',
    'categorias/seguridad-privada',
    'categorias/equipo-contra-incendios'
]

print("=== Corrigiendo footers de páginas de categorías ===")
for cat in categorias_principales:
    filepath = os.path.join(base_path, cat)
    if os.path.exists(filepath):
        if fix_footer(filepath, FOOTER_CATEGORIAS):
            print(f"✓ {cat}")
        else:
            print(f"✗ {cat} - No se encontró footer")
    else:
        print(f"✗ {cat} - Archivo no existe")

print("\n=== Corrigiendo footers de perfiles de empresas ===")
for empresa_dir in empresas_dirs:
    dir_path = os.path.join(base_path, empresa_dir)
    if os.path.isdir(dir_path):
        for filename in os.listdir(dir_path):
            if filename.endswith('.html'):
                filepath = os.path.join(dir_path, filename)
                if fix_footer(filepath, FOOTER_EMPRESAS):
                    print(f"✓ {empresa_dir}/{filename}")
                else:
                    print(f"✗ {empresa_dir}/{filename} - No se encontró footer")

print("\n=== Proceso completado ===")
