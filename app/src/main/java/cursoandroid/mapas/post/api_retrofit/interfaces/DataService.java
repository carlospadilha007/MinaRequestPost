package cursoandroid.mapas.post.api_retrofit.interfaces;

import java.util.List;

import cursoandroid.mapas.post.api_retrofit.model.Localizacao;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface DataService {
    @POST("/locations")
    Call<List<Localizacao>> buscarLocalizacao(@Body Localizacao localizacao);

}
