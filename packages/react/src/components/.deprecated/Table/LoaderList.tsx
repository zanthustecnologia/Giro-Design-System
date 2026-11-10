import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

/**
 * Componente de loading para lista de tabela
 * Simula o carregamento de dados em formato de tabela usando ContentLoader
 * @param props - Propriedades adicionais para o ContentLoader
 * @returns Elemento de loading animado
 */
const LoaderList: React.FC<IContentLoaderProps> = (props) => (
  <ContentLoader
    speed={1}
    width="100%"
    viewBox="0 0 1272 652"
    backgroundColor="#F5F5F7"
    foregroundColor="#FFFFFF"
    {...props}
  >
    {/* Cabeçalho da tabela */}
    <rect x="0" y="0" rx="8" ry="8" width="1272" height="44" />

    {/* Primeira linha */}
    <rect x="0" y="76" rx="12" ry="12" width="402" height="24" />
    <rect x="0" y="116" rx="8" ry="8" width="280" height="16" />
    <rect x="426" y="76" rx="12" ry="12" width="244" height="24" />
    <rect x="426" y="116" rx="8" ry="8" width="178" height="16" />
    <rect x="694" y="76" rx="12" ry="12" width="244" height="24" />
    <rect x="694" y="116" rx="8" ry="8" width="178" height="16" />
    <rect x="962" y="76" rx="12" ry="12" width="143" height="24" />
    <rect x="962" y="116" rx="8" ry="8" width="90" height="16" />
    <rect x="1129" y="76" rx="12" ry="12" width="143" height="24" />
    <rect x="1129" y="116" rx="8" ry="8" width="90" height="16" />

    {/* Segunda linha */}
    <rect x="0" y="164" rx="12" ry="12" width="402" height="24" />
    <rect x="0" y="204" rx="8" ry="8" width="280" height="16" />
    <rect x="426" y="164" rx="12" ry="12" width="244" height="24" />
    <rect x="426" y="204" rx="8" ry="8" width="178" height="16" />
    <rect x="694" y="164" rx="12" ry="12" width="244" height="24" />
    <rect x="694" y="204" rx="8" ry="8" width="178" height="16" />
    <rect x="962" y="164" rx="12" ry="12" width="143" height="24" />
    <rect x="962" y="204" rx="8" ry="8" width="90" height="16" />
    <rect x="1129" y="164" rx="12" ry="12" width="143" height="24" />
    <rect x="1129" y="204" rx="8" ry="8" width="90" height="16" />

    {/* Terceira linha */}
    <rect x="0" y="252" rx="12" ry="12" width="402" height="24" />
    <rect x="0" y="292" rx="8" ry="8" width="280" height="16" />
    <rect x="426" y="252" rx="12" ry="12" width="244" height="24" />
    <rect x="426" y="292" rx="8" ry="8" width="178" height="16" />
    <rect x="694" y="252" rx="12" ry="12" width="244" height="24" />
    <rect x="694" y="292" rx="8" ry="8" width="178" height="16" />
    <rect x="962" y="252" rx="12" ry="12" width="143" height="24" />
    <rect x="962" y="292" rx="8" ry="8" width="90" height="16" />
    <rect x="1129" y="252" rx="12" ry="12" width="143" height="24" />
    <rect x="1129" y="292" rx="8" ry="8" width="90" height="16" />

    {/* Quarta linha */}
    <rect x="0" y="340" rx="12" ry="12" width="402" height="24" />
    <rect x="0" y="380" rx="8" ry="8" width="280" height="16" />
    <rect x="426" y="340" rx="12" ry="12" width="244" height="24" />
    <rect x="426" y="380" rx="8" ry="8" width="178" height="16" />
    <rect x="694" y="340" rx="12" ry="12" width="244" height="24" />
    <rect x="694" y="380" rx="8" ry="8" width="178" height="16" />
    <rect x="962" y="340" rx="12" ry="12" width="143" height="24" />
    <rect x="962" y="380" rx="8" ry="8" width="90" height="16" />
    <rect x="1129" y="340" rx="12" ry="12" width="143" height="24" />
    <rect x="1129" y="380" rx="8" ry="8" width="90" height="16" />

    {/* Quinta linha */}
    <rect x="0" y="428" rx="12" ry="12" width="402" height="24" />
    <rect x="0" y="468" rx="8" ry="8" width="280" height="16" />
    <rect x="426" y="428" rx="12" ry="12" width="244" height="24" />
    <rect x="426" y="468" rx="8" ry="8" width="178" height="16" />
    <rect x="694" y="428" rx="12" ry="12" width="244" height="24" />
    <rect x="694" y="468" rx="8" ry="8" width="178" height="16" />
    <rect x="962" y="428" rx="12" ry="12" width="143" height="24" />
    <rect x="962" y="468" rx="8" ry="8" width="90" height="16" />
    <rect x="1129" y="428" rx="12" ry="12" width="143" height="24" />
    <rect x="1129" y="468" rx="8" ry="8" width="90" height="16" />

    {/* Sexta linha */}
    <rect x="0" y="516" rx="12" ry="12" width="402" height="24" />
    <rect x="0" y="556" rx="8" ry="8" width="280" height="16" />
    <rect x="426" y="516" rx="12" ry="12" width="244" height="24" />
    <rect x="426" y="556" rx="8" ry="8" width="178" height="16" />
    <rect x="694" y="516" rx="12" ry="12" width="244" height="24" />
    <rect x="694" y="556" rx="8" ry="8" width="178" height="16" />
    <rect x="962" y="516" rx="12" ry="12" width="143" height="24" />
    <rect x="962" y="556" rx="8" ry="8" width="90" height="16" />
    <rect x="1129" y="516" rx="12" ry="12" width="143" height="24" />
    <rect x="1129" y="556" rx="8" ry="8" width="90" height="16" />

    {/* Rodapé da tabela */}
    <rect x="0" y="604" rx="8" ry="8" width="1272" height="48" />
  </ContentLoader>
)
export default LoaderList;